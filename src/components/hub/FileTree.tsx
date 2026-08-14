type Node = { name: string; children: Map<string, Node>; isFile: boolean };

function buildTree(files: string[]): Node {
  const root: Node = { name: "", children: new Map(), isFile: false };
  for (const file of files) {
    const parts = file.split("/");
    let cursor = root;
    parts.forEach((part, i) => {
      const isFile = i === parts.length - 1;
      if (!cursor.children.has(part)) {
        cursor.children.set(part, { name: part, children: new Map(), isFile });
      }
      cursor = cursor.children.get(part)!;
    });
  }
  return root;
}

function Branch({ node, depth }: { node: Node; depth: number }) {
  const entries = [...node.children.values()].sort((a, b) => {
    if (a.isFile !== b.isFile) return a.isFile ? 1 : -1;
    return a.name.localeCompare(b.name);
  });

  return (
    <ul className={depth === 0 ? "space-y-1" : "space-y-1"}>
      {entries.map((child) => (
        <li key={child.name}>
          <div
            className="flex items-center gap-2 text-xs"
            style={{ paddingLeft: `${depth * 16}px` }}
          >
            <span className="text-muted-foreground">{child.isFile ? "├─" : "▾"}</span>
            <span className={child.isFile ? "text-foreground" : "text-primary"}>
              {child.name}
              {child.isFile ? "" : "/"}
            </span>
          </div>
          {!child.isFile ? <Branch node={child} depth={depth + 1} /> : null}
        </li>
      ))}
    </ul>
  );
}

export function FileTree({ slug, files }: { slug: string; files: string[] }) {
  const tree = buildTree(files);

  return (
    <div className="panel p-4">
      <p className="mb-3 text-xs text-primary">.agents/skills/{slug}/</p>
      <Branch node={tree} depth={0} />
      <p className="mt-4 border-t border-border pt-3 text-[10px] text-muted-foreground">
        {files.length} files in manifest
      </p>
    </div>
  );
}
