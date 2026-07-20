export const GET = async ({ request }) => {
 const accept = request.headers.get('accept') || '';
const wantsMarkdown = accept.includes('text/markdown') || accept.includes('text/*') || accept.includes('*/*');

const content = `# NEO FlowOFF SDR Landing\n\nThis site exposes a public landing experience for SDR AI orchestration and lead capture.\n\n- Primary destination: https://wa.me/5562994789032\n- Chat endpoint: /api/chat\n- Agent discovery: /.well-known/agent-manifest.json\n`;

return new Response(content, {
    status: 200,
    headers: {
        'Content-Type': wantsMarkdown ? 'text/markdown; charset=utf-8' : 'text/plain; charset=utf-8',
        'x-markdown-tokens': '48',
        'Cache-Control': 'public, max-age=300'
    }
});
};
