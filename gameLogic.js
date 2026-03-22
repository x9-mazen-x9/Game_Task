const GameLogic = {
    xpPerLevel: 100,

    updateXP(currentXP, amount) {
        let newXP = currentXP + amount;
        let leveledUp = false;

        if (newXP >= this.xpPerLevel) {
            newXP -= this.xpPerLevel;
            leveledUp = true;
        }
        return { newXP, leveledUp };
    },

    updateUI(stats) {
        document.getElementById('currentXP').innerText = stats.xp;
        document.getElementById('currentLevel').innerText = stats.level;
        document.getElementById('xpFill').style.width = `${(stats.xp / this.xpPerLevel) * 100}%`;
        
        // إضافة حركة نبض عند الزيادة
        const fill = document.getElementById('xpFill');
        fill.classList.add('pulse');
        setTimeout(() => fill.classList.remove('pulse'), 300);
    }
};
