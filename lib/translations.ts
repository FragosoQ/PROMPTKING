
export const translations = {
  en: {
    // Header
    appTitle: 'Prompt Practice Pad',
    history: 'History',
    tutorials: 'Tutorials',

    // Home
    homeTitle: 'Master the Art of AI Communication',
    homeSubtitle: 'Choose a practice mode below to hone your prompt engineering skills. Tackle realistic scenarios and get instant, AI-powered feedback.',
    mcqTitle: 'Multiple-Choice Quiz',
    mcqDescription: 'Test your theoretical knowledge. Analyze a client problem and choose the best prompting strategy from a set of options.',
    promptDevTitle: 'Prompt Development',
    promptDevDescription: 'Put theory into practice. Read a client brief and write your own prompt from scratch to solve their problem.',

    // Multiple Choice Test
    loadingTest: 'Generating your test...',
    evaluatingAnswers: 'Evaluating your answers...',
    errorLoadTest: 'Failed to load the test. Please try again later.',
    errorEvaluate: 'Failed to evaluate your answers. Please try again.',
    noTestError: 'No test data available.',
    clientScenario: 'Client Scenario',
    question: 'Question',
    back: 'Back',
    next: 'Next',
    submitEvaluation: 'Submit for Evaluation',

    // Prompt Development
    loadingProblem: 'Crafting a client problem for you...',
    evaluatingPrompt: 'Our expert is evaluating your prompt...',
    errorLoadProblem: 'Failed to load a problem. Please try again later.',
    errorEvaluatePrompt: 'Failed to evaluate your prompt. Please try again.',
    noProblemError: 'No problem data available.',
    clientBrief: 'Client Brief',
    client: 'Client',
    task: 'Task',
    desiredOutput: 'Desired Output',
    yourPrompt: 'Your Prompt',
    yourPromptHint: "Write your best prompt to solve the client's problem.",
    yourPromptPlaceholder: 'e.g., Act as a professional copywriter...',

    // History
    noHistoryTitle: 'No History Yet',
    noHistorySubtitle: 'Complete a multiple-choice quiz or a prompt development exercise to see your results here.',
    historyTitle: 'Your Practice History',
    searchHistoryPlaceholder: 'Search by keyword, topic, or prompt...',
    noResultsFound: 'No Results Found',
    noResultsFoundSubtitle: "We couldn't find any matches for your search.",

    // Results
    evaluationComplete: 'Evaluation Complete',
    suggestionsForImprovement: 'Suggestions for Improvement',
    backToHome: 'Back to Home',
    yourAnswer: 'Your answer:',
    correctAnswer: 'Correct answer:',
    explanation: 'Explanation:',
    why: 'Why?',
    expertSuggestion: "Expert's Suggestion",

    // Tutorials
    tutorialsTitle: 'Expand Your Knowledge',
    tutorialsSubtitle: 'Explore these resources to deepen your understanding of advanced AI and prompt engineering concepts.',
    promptingMasteryTitle: 'Prompting Mastery',
    promptingMasteryDesc: 'Learn the fundamentals of prompt design, including zero-shot, few-shot, and persona techniques to get better results from any LLM.',
    promptingMasteryDetail: `
Key Techniques:
- Zero-shot: Directly ask the model to perform a task without any prior examples. (e.g., "Translate 'hello' to French.")
- One-shot: Provide a single example to guide the model's response format. (e.g., "Translate English to French. sea otter -> loutre de mer. cheese -> ?")
- Few-shot: Offer several examples to demonstrate a complex pattern or style.
- Persona: Instruct the model to adopt a specific role. (e.g., "Act as a senior software engineer and review my code.")
    `,
    ragExplainedTitle: 'Understanding RAG',
    ragExplainedDesc: 'Dive into Retrieval-Augmented Generation to learn how to ground models with external data for more accurate and context-aware responses.',
    ragExplainedDetail: `
RAG is a powerful technique that combines the vast knowledge of an LLM with specific, external information.
The process:
1.  **Retrieve:** When a query is made, the system first searches a knowledge base (like a set of company documents or a database) for relevant information.
2.  **Augment:** The retrieved information is added to the original prompt as context.
3.  **Generate:** The LLM uses this augmented prompt to generate a response that is grounded in the provided data, reducing hallucinations and improving accuracy.
    `,
    vertexAiIntroTitle: 'Intro to Vertex AI',
    vertexAiIntroDesc: "Discover Google Cloud's unified AI platform. Learn how to build, deploy, and scale ML models with pre-trained APIs and custom tooling.",
    vertexAiIntroDetail: `
Vertex AI is a managed machine learning (ML) platform that lets you accelerate the deployment and maintenance of AI models.
Key Features:
- **Model Garden:** A central place to discover, use, and customize a wide range of Google's foundation models and third-party models.
- **AutoML:** Train high-quality custom machine learning models with minimal effort and ML expertise.
- **Pipelines:** Create and manage serverless, reproducible ML workflows.
- **Agent Builder:** Build and deploy enterprise-grade generative AI agents.
    `,
    buildingAgentsTitle: 'Building AI Agents',
    buildingAgentsDesc: 'Go beyond simple prompts. Learn the principles of creating autonomous agents that can reason, plan, and execute complex tasks.',
    buildingAgentsDetail: `
An AI agent is more than a chatbot. It's a system that can understand a goal, break it down into steps, and use tools to achieve it.
Core Components:
- **LLM as the "Brain":** The core language model that performs reasoning and planning.
- **Tools:** Functions or APIs the agent can call to interact with the outside world (e.g., search the web, access a database, send an email).
- **Memory:** The ability to retain information from past interactions to inform future actions.
- **Planning:** The process of decomposing a large task into smaller, manageable sub-tasks.
    `,
    chainOfThoughtTitle: 'Chain-of-Thought Prompting',
    chainOfThoughtDesc: 'Encourage models to "think out loud" by structuring prompts that guide them through a step-by-step reasoning process for complex problems.',
    chainOfThoughtDetail: `
Chain-of-Thought (CoT) prompting improves results for tasks requiring reasoning, such as math problems or logic puzzles. By asking the model to explain its steps, you guide it toward a more accurate conclusion.

Example Prompt:
"Q: Roger has 5 tennis balls. He buys 2 more cans of tennis balls. Each can has 3 tennis balls. How many tennis balls does he have now?

A: Let's break this down step by step.
1. Roger started with 5 balls.
2. He bought 2 cans, and each can has 3 balls, so that's 2 * 3 = 6 new balls.
3. In total, he now has 5 + 6 = 11 balls.
The final answer is 11."
    `,
  },
  pt: {
    // Header
    appTitle: 'Painel de Prática de Prompt',
    history: 'Histórico',
    tutorials: 'Tutoriais',

    // Home
    homeTitle: 'Domine a Arte da Comunicação com IA',
    homeSubtitle: 'Escolha um modo de prática abaixo para aprimorar suas habilidades em engenharia de prompt. Enfrente cenários realistas e obtenha feedback instantâneo com tecnologia de IA.',
    mcqTitle: 'Quiz de Múltipla Escolha',
    mcqDescription: 'Teste seu conhecimento teórico. Analise um problema de cliente e escolha a melhor estratégia de prompt a partir de um conjunto de opções.',
    promptDevTitle: 'Desenvolvimento de Prompt',
    promptDevDescription: 'Coloque a teoria em prática. Leia o briefing de um cliente e escreva seu próprio prompt do zero para resolver o problema dele.',
    
    // Multiple Choice Test
    loadingTest: 'Gerando seu teste...',
    evaluatingAnswers: 'Avaliando suas respostas...',
    errorLoadTest: 'Falha ao carregar o teste. Por favor, tente novamente mais tarde.',
    errorEvaluate: 'Falha ao avaliar suas respostas. Por favor, tente novamente.',
    noTestError: 'Nenhum dado de teste disponível.',
    clientScenario: 'Cenário do Cliente',
    question: 'Questão',
    back: 'Voltar',
    next: 'Próximo',
    submitEvaluation: 'Submeter para Avaliação',

    // Prompt Development
    loadingProblem: 'Elaborando um problema de cliente para você...',
    evaluatingPrompt: 'Nosso especialista está avaliando seu prompt...',
    errorLoadProblem: 'Falha ao carregar um problema. Por favor, tente novamente mais tarde.',
    errorEvaluatePrompt: 'Falha ao avaliar seu prompt. Por favor, tente novamente.',
    noProblemError: 'Nenhum dado de problema disponível.',
    clientBrief: 'Briefing do Cliente',
    client: 'Cliente',
    task: 'Tarefa',
    desiredOutput: 'Resultado Desejado',
    yourPrompt: 'Seu Prompt',
    yourPromptHint: 'Escreva seu melhor prompt para resolver o problema do cliente.',
    yourPromptPlaceholder: 'Ex: Aja como um redator profissional...',

    // History
    noHistoryTitle: 'Nenhum Histórico Ainda',
    noHistorySubtitle: 'Complete um quiz de múltipla escolha ou um exercício de desenvolvimento de prompt para ver seus resultados aqui.',
    historyTitle: 'Seu Histórico de Prática',
    searchHistoryPlaceholder: 'Pesquisar por palavra-chave, tópico ou prompt...',
    noResultsFound: 'Nenhum Resultado Encontrado',
    noResultsFoundSubtitle: 'Não foi possível encontrar resultados para sua busca.',

    // Results
    evaluationComplete: 'Avaliação Concluída',
    suggestionsForImprovement: 'Sugestões de Melhoria',
    backToHome: 'Voltar para o Início',
    yourAnswer: 'Sua resposta:',
    correctAnswer: 'Resposta correta:',
    explanation: 'Explicação:',
    why: 'Por quê?',
    expertSuggestion: 'Sugestão do Especialista',

    // Tutorials
    tutorialsTitle: 'Expanda Seu Conhecimento',
    tutorialsSubtitle: 'Explore estes recursos para aprofundar sua compreensão sobre conceitos avançados de IA e engenharia de prompt.',
    promptingMasteryTitle: 'Mestria em Prompting',
    promptingMasteryDesc: 'Aprenda os fundamentos do design de prompts, incluindo técnicas de zero-shot, few-shot e persona para obter melhores resultados de qualquer LLM.',
    promptingMasteryDetail: `
Técnicas Principais:
- Zero-shot: Peça diretamente ao modelo para realizar uma tarefa sem exemplos prévios. (Ex: "Traduza 'hello' para francês.")
- One-shot: Forneça um único exemplo para guiar o formato da resposta do modelo. (Ex: "Traduza inglês para francês. sea otter -> loutre de mer. cheese -> ?")
- Few-shot: Ofereça vários exemplos para demonstrar um padrão ou estilo complexo.
- Persona: Instrua o modelo a adotar um papel específico. (Ex: "Aja como um engenheiro de software sênior e revise meu código.")
    `,
    ragExplainedTitle: 'Entendendo RAG',
    ragExplainedDesc: 'Mergulhe na Geração Aumentada por Recuperação (RAG) para aprender a fundamentar modelos com dados externos para respostas mais precisas e contextuais.',
    ragExplainedDetail: `
RAG é uma técnica poderosa que combina o vasto conhecimento de um LLM com informações externas específicas.
O processo:
1.  **Recuperar:** Quando uma consulta é feita, o sistema primeiro busca em uma base de conhecimento (como um conjunto de documentos da empresa ou um banco de dados) por informações relevantes.
2.  **Aumentar:** As informações recuperadas são adicionadas ao prompt original como contexto.
3.  **Gerar:** O LLM usa este prompt aumentado para gerar uma resposta que é baseada nos dados fornecidos, reduzindo alucinações e melhorando a precisão.
    `,
    vertexAiIntroTitle: 'Introdução ao Vertex AI',
    vertexAiIntroDesc: "Descubra a plataforma de IA unificada do Google Cloud. Aprenda a construir, implantar e escalar modelos de ML com APIs pré-treinadas e ferramentas personalizadas.",
    vertexAiIntroDetail: `
Vertex AI é uma plataforma de machine learning (ML) gerenciada que permite acelerar a implantação e manutenção de modelos de IA.
Recursos Principais:
- **Model Garden:** Um local central para descobrir, usar e personalizar uma vasta gama de modelos de base do Google e de terceiros.
- **AutoML:** Treine modelos de machine learning personalizados de alta qualidade com esforço mínimo e pouca experiência em ML.
- **Pipelines:** Crie e gerencie fluxos de trabalho de ML reproduzíveis e sem servidor.
- **Agent Builder:** Construa e implante agentes de IA generativa de nível empresarial.
    `,
    buildingAgentsTitle: 'Construindo Agentes de IA',
    buildingAgentsDesc: 'Vá além de prompts simples. Aprenda os princípios da criação de agentes autônomos que podem raciocinar, planejar e executar tarefas complexas.',
    buildingAgentsDetail: `
Um agente de IA é mais que um chatbot. É um sistema que pode entender um objetivo, dividi-lo em etapas e usar ferramentas para alcançá-lo.
Componentes Essenciais:
- **LLM como o "Cérebro":** O modelo de linguagem central que realiza o raciocínio e o planejamento.
- **Ferramentas:** Funções ou APIs que o agente pode chamar para interagir com o mundo exterior (ex: pesquisar na web, acessar um banco de dados, enviar um e-mail).
- **Memória:** A capacidade de reter informações de interações passadas para informar ações futuras.
- **Planejamento:** O processo de decompor uma tarefa grande em subtarefas menores e gerenciáveis.
    `,
    chainOfThoughtTitle: 'Prompt de Cadeia de Pensamento',
    chainOfThoughtDesc: 'Incentive os modelos a "pensar em voz alta", estruturando prompts que os guiam através de um processo de raciocínio passo a passo para problemas complexos.',
    chainOfThoughtDetail: `
O prompt de Cadeia de Pensamento (CoT) melhora os resultados para tarefas que exigem raciocínio, como problemas de matemática ou quebra-cabeças lógicos. Ao pedir ao modelo para explicar seus passos, você o guia para uma conclusão mais precisa.

Exemplo de Prompt:
"P: Roger tem 5 bolas de tênis. Ele compra mais 2 latas de bolas de tênis. Cada lata tem 3 bolas de tênis. Quantas bolas de tênis ele tem agora?

R: Vamos analisar passo a passo.
1. Roger começou com 5 bolas.
2. Ele comprou 2 latas, e cada lata tem 3 bolas, então são 2 * 3 = 6 bolas novas.
3. No total, ele agora tem 5 + 6 = 11 bolas.
A resposta final é 11."
    `,
  }
};
