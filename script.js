import { enemies } from "./enemies.js";

const player_name = document.getElementById("player_name");
const player_level = document.getElementById("player_level");
const player_hp = document.getElementById("player_hp");
const player_potion = document.getElementById("player_potion");

const enemy_name = document.getElementById("enemy_name");
const enemy_hp = document.getElementById("enemy_hp");
const enemy_image = document.getElementById("enemy_img")
const enemy_dmg = document.getElementById("enemy_dmg")

const message = document.getElementById("message");

const actions = document.getElementById("actions")


const player = {
    name: "Herói",
    maxHp: 100,
    hp: 100,
    maxPotion: 3,
    potion: 3,
    attack: 15,
    defense: 10,
    level: 1,
    exp: 0,

};

var enemy = {
    name: "Goblin",
    hp: 50,
    attack: 15,
    defense: 5,
    rank: "Fraco",
    sprite: "./assets/enemies/GoblinLat.png",
    expDrop: 20
};

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomEnemy() {
    let randomIndex = Math.floor(Math.random() * 3);
    if(player.level%5==0){
        randomIndex = Math.floor(Math.random() * 6);
    }

    enemy = {... enemies[randomIndex]}
    enemy_image.setAttribute('src', enemy.sprite);
}

async function heal(){

    if(player.hp === player.maxHp){
        player.hp = player.maxHp
        message.innerText = "Vida Cheia"
        message.className = "display-block"
        await delay(1000)
        message.className = "display-none"
        battle()
        return
    }

    player_hp.innerText = "HP: "+player.hp + "+40"

    await delay(1000)

    player.hp += 40
    player.potion --

    if(player.hp > player.maxHp){
        player.hp = player.maxHp
    }

    if(player.potion<=0){
        message.innerText = "Você não tem mais curas"
    }

    battle()

}

async function attack(){
    
    enemy.hp += enemy.defense - player.attack

    enemy_dmg.innerText = enemy.defense - player.attack
    enemy_dmg.className = "display-block"
    actions.className = "display-none"
    

    await delay(500)

    enemy_dmg.className = "display-none"
    actions.className = ""
    battle()

}

async function levelUp(){
        player.level++
        if(player.level%2===0){
            player.attack ++
            message.innerText = `Você Subiu para o nível ${player.level}\n\nAtaque: +1` 
        }else{
            player.defense ++
            message.innerText = `Você Subiu para o nível ${player.level}\n\nDefesa: +1` 
        }
        
        message.className = "display-block"
        actions.className = "display-none"

        await delay(2000)

        message.className = "display-none"
        actions.className = ""

        player.maxHp += player.level * 10
        player.hp = player.maxHp
        showStatusPlayer()
}

async function battle(){

    player.hp += player.defense - enemy.attack

    if(enemy.hp <= 0){

        enemy.hp = 0

        showStatusEnemy()
        showStatusPlayer()

        message.innerText = "Você Venceu!!!"
        message.className = "display-block"
        actions.className = "display-none"

        await delay(1000)

        message.className = "display-none"
        actions.className = ""

        player.exp += enemy.expDrop


        if(player.exp >= (player.level * 100)){

            levelUp()
            
        }

        getRandomEnemy()

    }

    else if( player.hp<=0){

        player.hp =0

        message.innerText = "Você Morreu!!!"
        message.className = "display-block"
        actions.className = "display-none"

    }

        

    showStatusEnemy()
    showStatusPlayer()
}



function showStatusPlayer(){
    player_name.innerText = `${player.name}`
    player_level.innerText = `Nível:${player.level}`
    player_hp.innerText = `HP:${player.hp}`
    player_potion.innerText = `Potion:${player.potion}/${player.maxPotion}`
}

function showStatusEnemy(){
    enemy_name.innerText = `${enemy.name}`
    enemy_hp.innerText = `HP:${enemy.hp}`
}

document.getElementById("attackBtn").addEventListener("click", attack);
document.getElementById("healBtn").addEventListener("click", heal);
getRandomEnemy()
showStatusPlayer()
showStatusEnemy()
