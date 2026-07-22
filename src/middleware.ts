import { defineMiddleware } from 'astro:middleware';

const MARKDOWN_PAGES: Record<string, string> = {
  '/': `# NEO FlowOFF SDR Landing — Neo Protocol Node

This site exposes a public landing experience for SDR AI orchestration and lead capture, operating as a sovereign node under the Neo Protocol specification (NEØ Protocol).

## Overview
- Agent SDR IA: NEØ:one [Agent SDR IA]
- Primary destination: https://wa.me/5562994789032
- Primary Chat Interface: Floating ChatBubble widget on landing page (/api/chat)
- Secondary Fullscreen Experience: https://chat.neoflowoff.agency
- API Chat Endpoint: /api/chat
- Agent Discovery Manifest: /.well-known/agent-manifest.json
- API Catalog: /.well-known/api-catalog.json
- Service Documentation: /.well-known/service-doc.md

## Core Capabilities
1. Immediate Response: -68% Response Time elimination of wait outside business hours.
2. Lead Qualification: +3.4x Qualification of Intent (name, role, pain points, conversation history).
3. Commercial Traceability: 100% data traceability between capture, CRM, and Meta CAPI.
4. Infrastructure: Edge Orchestration, Meta Tech Provider integration, automated human handoff.

## Canonical Pages
- / : Main Landing Page & ROAS Calculator
- /oferta : 14-day Deployment Schedule & Offer Details
- /privacidade : Privacy Policy & LGPD Compliance
- /termos : Terms of Service
- /tratamento-dados : Data Processing Policy
`,
  '/oferta': `# NEØ:one — A Oferta & Implantação em 14 Dias

Detalhamento completo da implantação da Operação SDR IA Plug & Play por neoflowoff.agency.

## Cronograma de Implantação (Gantt - 14 Dias)
- FASE 01 (Dias 1-3): Onboarding & Setup de Domínio (Configuração de DNS, SSL, DKIM e infraestrutura).
- FASE 02 (Dias 4-7): Ajuste Cognitivo do Agente (Treinamento do NEØ:one com a base de conhecimento e contexto comercial da empresa).
- FASE 03 (Dias 8-10): Integração Meta CAPI & Webhooks (Conexão do agente com Meta CAPI, CRM e disparo de handoff humano).
- FASE 04 (Dias 11-14): Homologação & Go-Live (Testes de estresse, validação de conversão e entrada em produção na borda).

## Entregáveis da Operação
- Agente SDR IA customizado (NEØ:one)
- Vitrine Webapp Responsiva + ChatBubble Glassmorphic
- Rota Edge /api/chat integrada à OpenAI
- Rastreamento unificado de UTMs, Meta CAPI (_fbp, _fbc) e CRM
- Suporte executivo e acompanhamento por Arquiteto comercial
`,
  '/privacidade': `# Política de Privacidade — NEØ Protocol / neoflowoff.agency

Política de privacidade e proteção de dados pessoais conforme a LGPD (Lei Geral de Proteção de Dados - Lei nº 13.709/2018).

- Coleta de dados minimizada para fins estritamente comerciais e de qualificação.
- Direitos dos titulares (acesso, correção, exclusão, portabilidade).
- Retenção e segurança da informação via criptografia e armazenamento em borda.
- Contato do Encarregado de Dados (DPO): dpo@neoflowoff.agency
`,
  '/termos': `# Termos de Uso — NEØ Protocol / neoflowoff.agency

Termos e condições de uso dos serviços de atendimento automatizado SDR IA e landing pages operadas pela neoflowoff.agency.

- Aceite dos termos ao navegar na plataforma ou interagir com o agente NEØ:one.
- Direitos de propriedade intelectual e diretrizes de uso aceitável.
- Isenções de responsabilidade e garantias operacionais.
`,
  '/tratamento-dados': `# Política de Tratamento de Dados — NEØ Protocol / neoflowoff.agency

Especificações técnicas do ciclo de vida, tratamento, consentimento e segurança de dados processados pela infraestrutura NEØ Protocol.

- Fundamentos legais (Execução de contrato e Legítimo interesse).
- Protocolos de segurança da informação, auditoria e prevenção contra vazamento de dados.
- Transferência internacional de dados e provedores de infraestrutura Edge (Cloudflare, OpenAI API).
`
};

export const onRequest = defineMiddleware(async (context, next) => {
  const request = context.request;
  const acceptHeader = request.headers.get('accept') || '';

  const isMarkdownRequest = acceptHeader.includes('text/markdown') || acceptHeader.includes('text/x-markdown');

  if (isMarkdownRequest) {
    const url = new URL(request.url);
    let path = url.pathname;
    if (path.length > 1 && path.endsWith('/')) {
      path = path.slice(0, -1);
    }

    const markdownContent = MARKDOWN_PAGES[path];
    if (markdownContent) {
      // Token estimation: approx 4 characters per token
      const tokens = Math.ceil(markdownContent.length / 4);

      return new Response(markdownContent.trim() + '\n', {
        status: 200,
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          'x-markdown-tokens': String(tokens),
          'Cache-Control': 'public, max-age=300'
        }
      });
    }
  }

  return next();
});
