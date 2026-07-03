# 11 — Emoji / 4-byte UTF-8 crash

**Risk:** A user types an emoji (😀, 🇺🇸, 👨‍👩‍👧) into a name, message, or bio field and the write blows up. Root causes:

- **MySQL/MariaDB:** column is `utf8` (3-byte max) instead of `utf8mb4`. Emojis are 4 bytes → `Incorrect string value: '\xF0\x9F...'`.
- **Postgres/Supabase:** the column itself is fine (Postgres text is full UTF-8), but a `varchar(N)` limit counts characters, and a naïve client-side `.length` check counts UTF-16 code units, so a single emoji like 👨‍👩‍👧 (7 code points, ~11 UTF-16 units) overflows a `varchar(10)` or a `maxLength={10}` input the user thought was "10 characters".
- **Anywhere:** JSON parsers, SMS gateways, and old CSV exporters may still choke on 4-byte sequences.

## Fix pattern

### 1. MySQL / MariaDB — use utf8mb4 end-to-end

```sql
ALTER DATABASE mydb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE users CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE users MODIFY name VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Also set the client charset (`SET NAMES utf8mb4`) or the driver's `charset: 'utf8mb4'` option.

### 2. Postgres / Supabase — validate by grapheme, not by length

`text` columns accept any UTF-8. The risk is length-limited columns and length-based UI validation:

```ts
// ❌ counts UTF-16 code units — a family emoji reads as ~11
if (name.length > 30) throw new Error("too long");

// ✅ count user-perceived characters (graphemes)
const seg = new Intl.Segmenter(undefined, { granularity: "grapheme" });
const graphemes = Array.from(seg.segment(name)).length;
if (graphemes > 30) throw new Error("too long");
```

Mirror the same limit on the server (zod `.refine`) and in the SQL column (`varchar(120)` gives plenty of byte headroom for 30 graphemes).

### 3. Validate inputs with zod on both sides

```ts
import { z } from "zod";
const seg = new Intl.Segmenter(undefined, { granularity: "grapheme" });
const grapheme = (max: number) =>
  z.string().refine((s) => Array.from(seg.segment(s)).length <= max, {
    message: `Must be ${max} characters or fewer`,
  });

export const profileSchema = z.object({
  name: grapheme(50),
  bio: grapheme(280),
});
```

### 4. If you must reject emoji (rare)

Do it explicitly, don't rely on charset accidents:

```ts
// Rejects code points outside the BMP (most emojis)
const noEmoji = /^[\p{L}\p{N}\p{P}\p{Zs}]+$/u;
if (!noEmoji.test(input)) throw new Error("Emojis are not allowed here");
```

Prefer allowing emoji everywhere — users expect it in names, chat, bios.

### 5. Verify

```sql
-- Postgres: prove text columns accept 4-byte UTF-8
SELECT octet_length('👨‍👩‍👧'), char_length('👨‍👩‍👧');
-- MySQL after migration
SHOW VARIABLES LIKE 'character_set_%';
```

Add a test that inserts `'Test 👨‍👩‍👧🇺🇸 名'` into every user-writable text column.
