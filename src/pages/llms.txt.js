export const GET = async ({ request }) => {
  const accept = request.headers.get('accept') || '';
  const wantsMarkdown = accept.includes('text/markdown') || accept.includes('text/*') || accept.includes('*/*');

  const content = `# NEO FlowOFF SDR Landing — Neo Protocol Node

This site exposes a public landing experience for SDR AI orchestration and lead capture, operating as a sovereign node under the Neo Protocol specification (NEØ Protocol).

- Primary destination: https://wa.me/5562994789032
- Chat endpoint: /api/chat
- Protocol specification: /NEO_PROTOCOL.md
- Agent discovery: /.well-known/agent-manifest.json
`;

  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': wantsMarkdown ? 'text/markdown; charset=utf-8' : 'text/plain; charset=utf-8',
      'x-markdown-tokens': '58',
      'Cache-Control': 'public, max-age=300'
    }
  });
};
