import { getModelById } from "@/app/lib/models";

function buildCubeStl(name: string) {
  const size = 20;
  const h = size / 2;
  const vertices = [
    [-h, -h, -h],
    [h, -h, -h],
    [h, h, -h],
    [-h, h, -h],
    [-h, -h, h],
    [h, -h, h],
    [h, h, h],
    [-h, h, h],
  ];

  const faces = [
    [0, 1, 2],
    [0, 2, 3],
    [4, 5, 6],
    [4, 6, 7],
    [0, 1, 5],
    [0, 5, 4],
    [1, 2, 6],
    [1, 6, 5],
    [2, 3, 7],
    [2, 7, 6],
    [3, 0, 4],
    [3, 4, 7],
  ];

  const triangles = faces
    .map(([a, b, c]) => {
      const points = [vertices[a], vertices[b], vertices[c]]
        .map(
          (point) =>
            `      vertex ${point[0].toFixed(4)} ${point[1].toFixed(4)} ${point[2].toFixed(4)}`
        )
        .join("\n");

      return `  facet normal 0.000000 0.000000 0.000000\n    outer loop\n${points}\n    endloop\n  endfacet`;
    })
    .join("\n");

  return `solid ${name}\n${triangles}\nendsolid ${name}\n`;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const model = await getModelById(id);

  if (!model) {
    return new Response("Model not found", { status: 404 });
  }

  const filename = model.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return new Response(buildCubeStl(model.name), {
    headers: {
      "Content-Type": "model/stl",
      "Content-Disposition": `attachment; filename="${filename || "model"}.stl"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
