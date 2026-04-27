// JSONファイルからデータを読み込んで、HTMLに動的に生成するスクリプト

document.addEventListener('DOMContentLoaded', () => {
    loadContent();
});

async function loadContent() {
    try {
        // JSONファイルを読み込む
        const response = await fetch('data/content.json');
        const data = await response.json();

        // 各セクションを更新
        updateLabInfo(data.lab);
        updateResearch(data.research);
        updateAchievements(data.achievements);
        updateMembers(data.members);
        updateContact(data.contact);
    } catch (error) {
        console.error('Error loading content:', error);
        document.body.innerHTML = '<p style="text-align:center;color:red;">コンテンツの読み込みに失敗しました。</p>';
    }
}

// 研究室情報を更新
function updateLabInfo(lab) {
    document.getElementById('lab-name').textContent = lab.name;
    document.getElementById('lab-description').textContent = lab.description;
}

// 研究内容を表示
function updateResearch(research) {
    const container = document.getElementById('research-content');
    container.innerHTML = research.map(item => `
        <div class="research-item">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
        </div>
    `).join('');
}

// 研究業績を表示
function updateAchievements(achievements) {
    const container = document.getElementById('achievements-content');
    container.innerHTML = achievements.map(item => `
        <div class="achievement-item">
            <div class="achievement-year">${item.year}</div>
            <h4>${item.title}</h4>
            <p>${item.description}</p>
        </div>
    `).join('');
}

// メンバーを表示
function updateMembers(members) {
    const container = document.getElementById('members-content');
    container.innerHTML = members.map(member => `
        <div class="member-card">
            <div class="member-avatar">${member.initials}</div>
            <h4>${member.name}</h4>
            <div class="member-role">${member.role}</div>
            <div class="member-email">${member.email}</div>
        </div>
    `).join('');
}

// 連絡先を表示
function updateContact(contact) {
    const container = document.getElementById('contact-content');
    container.innerHTML = contact.map(item => `
        <div class="contact-item">
            <h4>${item.type}</h4>
            <p>${item.content.replace(/\n/g, '<br>')}</p>
        </div>
    `).join('');
}
