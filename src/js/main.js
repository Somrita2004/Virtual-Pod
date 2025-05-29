// Global project state
let projectData = {
    name: '',
    description: '',
    techStack: '',
    artifacts: [],
    currentPhase: 'initialization',
    agents: {
        projectLead: { status: 'idle', output: '' },
        businessAnalyst: { status: 'idle', output: '' },
        designer: { status: 'idle', output: '' },
        developer: { status: 'idle', output: '' },
        tester: { status: 'idle', output: '' }
    }
};

// Templates & Generators
const agentTemplates = {
    requirements: {
        userStoryTemplate: `As a [user type], I want [functionality] so that [benefit].

Acceptance Criteria:
- Given [context]
- When [action]
- Then [expected result]

Priority: [High/Medium/Low]
Story Points: [1-13]`,

        generateUserStories: function(description) {
            return [
                {
                    title: "User Authentication",
                    description: `As a user, I want to securely log in to the application so that I can access personalized features.`
                },
                {
                    title: "Dashboard Overview",
                    description: `As a logged-in user, I want to see an overview dashboard so that I can quickly understand the application status.`
                },
                {
                    title: "Data Management",
                    description: `As a user, I want to manage my data efficiently so that I can maintain accurate information.`
                }
            ];
        }
    },
    design: {
        generateDesignSpecs: () => ({
            wireframes: `Wireframes for header, dashboard, and data sections.`,
            architecture: `Three-tier architecture with front-end, back-end, and database layer.`
        })
    },
    development: {
        generateCode: (techStack) => {
            return `// Generated ${techStack} code placeholder\nconsole.log('Code generated for ${techStack}');`;
        }
    },
    testing: {
        generateTestCases: () => [
            {
                type: "Unit Test",
                name: "Login Test",
                description: "Checks login functionality",
                testCode: `describe('Login', () => { it('should log in', () => { /* ... */ }) });`
            }
        ]
    }
};

// UI Helpers
function showTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.tab').forEach(el => el.classList.remove('active'));
    document.getElementById(tabName).classList.remove('hidden');
    event.target.classList.add('active');
}

function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type} show`;
    setTimeout(() => notification.classList.remove('show'), 3000);
}

function updateAgentStatus(agent, status, output = '') {
    const statusEl = document.getElementById(`${agent}Status`);
    const outputEl = document.getElementById(`${agent}Output`);
    if (statusEl) {
        statusEl.className = `agent-status status-${status}`;
        statusEl.textContent = status.toUpperCase();
    }
    if (outputEl && output) {
        outputEl.innerHTML = `<div class="code-output">${output}</div>`;
    }
}

function updateProgress(percentage) {
    document.getElementById('overallProgress').style.width = `${percentage}%`;
}

// Project Functions
function initializeProject() {
    const name = document.getElementById('projectName').value;
    const description = document.getElementById('projectDescription').value;
    const techStack = document.getElementById('techStack').value;

    if (!name || !description) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }

    projectData = { ...projectData, name, description, techStack };
    updateAgentStatus('projectLead', 'working');

    setTimeout(() => {
        const output = `Project "${name}" initialized successfully with ${techStack}.`;
        updateAgentStatus('projectLead', 'complete', output);
        updateProgress(20);
        showNotification('Project initialized successfully!');
        addArtifact('Project Configuration', 'config', { name, description, techStack });
    }, 2000);
}

function generateRequirements() {
    updateAgentStatus('ba', 'working');
    setTimeout(() => {
        const stories = agentTemplates.requirements.generateUserStories(projectData.description);
        const container = document.getElementById('userStories');
        container.innerHTML = '';
        let output = '';

        stories.forEach((story, i) => {
            output += `${i + 1}. ${story.title}\n${story.description}\n\n`;
            const card = document.createElement('div');
            card.className = 'artifact-item';
            card.innerHTML = `
                <div class="artifact-header">
                    <div class="artifact-title">${story.title}</div>
                    <div class="artifact-type">User Story</div>
                </div>
                <pre style="white-space: pre-wrap; font-family: inherit;">${story.description}</pre>`;
            container.appendChild(card);
            addArtifact(story.title, 'user-story', story);
        });

        updateAgentStatus('ba', 'complete', output);
        updateProgress(40);
        showNotification('User stories generated!');
    }, 2000);
}

function generateDesign() {
    updateAgentStatus('designer', 'working');
    setTimeout(() => {
        const { wireframes, architecture } = agentTemplates.design.generateDesignSpecs();
        const container = document.getElementById('designArtifacts');
        container.innerHTML = `
            <div class="artifact-item">
                <div class="artifact-header"><div class="artifact-title">Wireframes</div><div class="artifact-type">Design</div></div>
                <pre class="code-output">${wireframes}</pre>
            </div>
            <div class="artifact-item">
                <div class="artifact-header"><div class="artifact-title">Architecture</div><div class="artifact-type">Architecture</div></div>
                <pre class="code-output">${architecture}</pre>
            </div>`;
        updateAgentStatus('designer', 'complete', wireframes + '\n\n' + architecture);
        updateProgress(60);
        showNotification('Design specs created!');
        addArtifact('Design Specs', 'design', { wireframes, architecture });
    }, 2000);
}

function generateCode() {
    updateAgentStatus('dev', 'working');
    setTimeout(() => {
        const code = agentTemplates.development.generateCode(projectData.techStack);
        const container = document.getElementById('codeArtifacts');
        container.innerHTML = `
            <div class="artifact-item">
                <div class="artifact-header"><div class="artifact-title">App Code</div><div class="artifact-type">Code</div></div>
                <div class="code-output">${code}</div>
            </div>`;
        updateAgentStatus('dev', 'complete', code);
        updateProgress(80);
        showNotification('Code generated!');
        addArtifact('App Code', 'code', { code });
    }, 2000);
}

function generateTests() {
    updateAgentStatus('tester', 'working');
    setTimeout(() => {
        const tests = agentTemplates.testing.generateTestCases();
        const container = document.getElementById('testResults');
        container.innerHTML = '';
        let output = '';
        tests.forEach(test => {
            output += `${test.name} (${test.type})\n`;
            const card = document.createElement('div');
            card.className = 'artifact-item';
            card.innerHTML = `
                <div class="artifact-header"><div class="artifact-title">${test.name}</div><div class="artifact-type">${test.type}</div></div>
                <p><strong>Description:</strong> ${test.description}</p>
                <div class="code-output">${test.testCode}</div>`;
            container.appendChild(card);
            addArtifact(test.name, 'test', test);
        });
        updateAgentStatus('tester', 'complete', output);
        updateProgress(90);
        showNotification('Test cases generated!');
    }, 2000);
}

function runTests() {
    showNotification('Running tests...');
    setTimeout(() => {
        const results = `✅ All tests passed successfully!`;
        const resultsDiv = document.createElement('div');
        resultsDiv.className = 'code-output';
        resultsDiv.style.marginTop = '20px';
        resultsDiv.textContent = results;
        document.getElementById('testResults').appendChild(resultsDiv);
        updateProgress(100);
        showNotification('Tests executed!');
    }, 2000);
}

// Artifact Management
function addArtifact(name, type, data) {
    projectData.artifacts.push({
        id: Date.now(),
        name,
        type,
        data,
        timestamp: new Date().toISOString()
    });
    updateArtifactsList();
}

function updateArtifactsList() {
    const container = document.getElementById('artifactsList');
    container.innerHTML = '';
    if (projectData.artifacts.length === 0) {
        container.innerHTML = '<p>No artifacts yet.</p>';
        return;
    }
    projectData.artifacts.forEach(artifact => {
        const card = document.createElement('div');
        card.className = 'artifact-item';
        card.innerHTML = `
            <div class="artifact-header">
                <div class="artifact-title">${artifact.name}</div>
                <div class="artifact-type">${artifact.type}</div>
            </div>
            <p><small>${new Date(artifact.timestamp).toLocaleString()}</small></p>`;
        card.onclick = () => showArtifactDetails(artifact);
        container.appendChild(card);
    });
}

function showArtifactDetails(artifact) {
    alert(`Artifact: ${artifact.name}\nType: ${artifact.type}\nCreated: ${new Date(artifact.timestamp).toLocaleString()}`);
}

function exportArtifacts() {
    if (projectData.artifacts.length === 0) {
        showNotification('No artifacts to export', 'error');
        return;
    }
    const dataStr = JSON.stringify({
        project: {
            name: projectData.name,
            description: projectData.description,
            techStack: projectData.techStack
        },
        artifacts: projectData.artifacts,
        exportDate: new Date().toISOString()
    }, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectData.name || 'virtual-pod'}-artifacts.json`;
    a.click();
    showNotification('Artifacts exported!');
}

// Chatbot
function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    if (!message) return;
    addChatMessage(message, 'user');
    input.value = '';
    setTimeout(() => {
        const response = generateAIResponse(message);
        addChatMessage(response, 'bot');
    }, 1000);
}

function addChatMessage(message, sender) {
    const container = document.getElementById('chatMessages');
    const div = document.createElement('div');
    div.className = `message ${sender}`;
    div.innerHTML = `<strong>${sender === 'bot' ? 'Virtual Pod Assistant' : 'You'}:</strong> ${message}`;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
}

function generateAIResponse(userMessage) {
    const msg = userMessage.toLowerCase();
    if (msg.includes('status') || msg.includes('progress')) {
        return `Current phase: ${projectData.currentPhase}. Artifacts: ${projectData.artifacts.length}.`;
    } else if (msg.includes('help')) {
        return 'I can help with project phases, generating user stories, designs, code, and tests.';
    } else {
        return `You said: "${userMessage}". How can I assist you further?`;
    }
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('chatInput');
    if (input) {
        input.addEventListener('keypress', e => {
            if (e.key === 'Enter') sendMessage();
        });
    }
    updateArtifactsList();
});
