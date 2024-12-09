import * as THREE from "three";


const textureLoader = new THREE.TextureLoader();
const Black_roughness = 0.5
const Black_metalness = 0.0
const White_roughness = 0.8
const White_metalness = 0.1

export const createPawnMaterialBlack = () => new THREE.MeshStandardMaterial({
    map: textureLoader.load('Textures_pawn/Obsydian_texture.png'),
    normalMap: textureLoader.load('Textures_pawn/Obsydian_normal.png'),
    displacementMap: textureLoader.load('Textures_pawn/Obsydian_texture_Displacment.png')*0.5,
    metalness: Black_metalness,
    roughness: Black_roughness
});

export const createPawnMaterialWhite = () => new THREE.MeshStandardMaterial({
    map: textureLoader.load("Textures_pawn/Marble_texture.png"),
    normalMap: textureLoader.load('Textures_pawn/Marble_normal.png'),
    metalness: White_metalness,
    roughness: White_roughness
});

export const createBishopMaterialBlack = () => new THREE.MeshStandardMaterial({
    map: textureLoader.load('Textures_bishop/Obsydian_texture.png'),
    normalMap: textureLoader.load('Textures_bishop/Obsydian_normal.png'),
    displacementMap: textureLoader.load('Textures_bishop/Obsydian_texture_Displacment.png')*0.5,
    metalness: Black_metalness,
    roughness: Black_roughness
});

export const createBishopMaterialWhite = () => new THREE.MeshStandardMaterial({
    map: textureLoader.load("Textures_bishop/Marble_texture.png"),
    normalMap: textureLoader.load('Textures_bishop/Marble_normal.png'),
    metalness: White_metalness,
    roughness: White_roughness
});

export const createRookMaterialBlack = () => new THREE.MeshStandardMaterial({
    map: textureLoader.load('Textures_rook/Obsydian_texture.png'),
    normalMap: textureLoader.load('Textures_rook/Obsydian_normal.png'),
    displacementMap: textureLoader.load('Textures_rook/Obsydian_texture_Displacment.png')*0.5,
    metalness: Black_metalness,
    roughness: Black_roughness
});

export const createRookMaterialWhite = () => new THREE.MeshStandardMaterial({
    map: textureLoader.load("Textures_rook/Marble_texture.png"),
    normalMap: textureLoader.load('Textures_rook/Marble_normal.png'),
    metalness: White_metalness,
    roughness: White_roughness
});

export const createKingMaterialObsidian = () => new THREE.MeshStandardMaterial({
    map: textureLoader.load('Textures_king/Black/Material_1/Material_1_Black_king_diffuse.png'),
    normalMap: textureLoader.load('Textures_king/Black/Material_1/Material_1_Black_king_normal.png'),
    displacementMap: textureLoader.load('Textures_king/Black/Material_1/Material_1_Black_king_displace.png')*0.5,
    metalness: Black_metalness,
    roughness: Black_roughness
});

export const createKingMaterialMarble = () => new THREE.MeshStandardMaterial({
    map: textureLoader.load('Textures_king/White/Material_1/Material_1_White_king_diffuse.png'),
    normalMap: textureLoader.load('Textures_king/White/Material_1/Material_1_White_king_normal.png'),
    displacementMap: textureLoader.load('Textures_king/White/Material_1/Material_1_White_king_displace.png')*0.5,
    metalness: White_metalness,
    roughness: White_roughness
});

export const createKingMaterialSatin = () => new THREE.MeshStandardMaterial({
    map: textureLoader.load('Textures_king/White/Material_2/Material_2_White_king_diffuse.png'),
    normalMap: textureLoader.load('Textures_king/White/Material_2/Material_2_White_king_normal.png'),
    displacementMap: textureLoader.load('Textures_king/White/Material_2/Material_2_White_king_displace.png')*0.5,
    metalness: 1,
    roughness: 1
});

export const createKingMaterialGold = () => new THREE.MeshStandardMaterial({
    map: textureLoader.load('Textures_king/White/Material_3/Material_3_White_king_diffuse.png'),
    normalMap: textureLoader.load('Textures_king/White/Material_3/Material_3_White_king_normal.png'),
    displacementMap: textureLoader.load('Textures_king/White/Material_3/Material_3_White_king_displace.png')*0.5,
    metalness: 0.95,
    roughness: 0.1
});

export const createQueenMaterialObsidian = () => new THREE.MeshStandardMaterial({
    map: textureLoader.load('Textures_queen/Black/Material_2/Material_2_Black_queen_diffuse.png'),
    normalMap: textureLoader.load('Textures_queen/Black/Material_2/Material_2_Black_queen_normal.png'),
    displacementMap: textureLoader.load('Textures_queen/Black/Material_2/Material_2_Black_queen_displace.png')*0.5,
    metalness: Black_metalness,
    roughness: Black_roughness
});

export const createQueenMaterialSatin = () => new THREE.MeshStandardMaterial({
    map: textureLoader.load('Textures_queen/White/Material_3/Material_3_White_queen_diffuse.png'),
    normalMap: textureLoader.load('Textures_queen/White/Material_3/Material_3_White_queen_normal.png'),
    displacementMap: textureLoader.load('Textures_queen/White/Material_3/Material_3_White_queen_displace.png')*0.5,
    metalness: 1,
    roughness: 1
});

export const createQueenMaterialGold = () => new THREE.MeshStandardMaterial({
    map: textureLoader.load('Textures_queen/White/Material_1/Material_1_White_queen_diffuse.png'),
    normalMap: textureLoader.load('Textures_queen/White/Material_1/Material_1_White_queen_normal.png'),
    displacementMap: textureLoader.load('Textures_queen/White/Material_1/Material_1_White_queen_displace.png')*0.5,
    metalness: 0.95,
    roughness: 0.1
});


export const createQueenMaterialMarble = () => new THREE.MeshStandardMaterial({
    map: textureLoader.load('Textures_queen/White/Material_2/Material_2_White_queen_diffuse.png'),
    normalMap: textureLoader.load('Textures_queen/White/Material_2/Material_2_White_queen_normal.png'),
    displacementMap: textureLoader.load('Textures_queen/White/Material_2/Material_2_White_queen_displace.png')*0.5,
    metalness: White_metalness,
    roughness: White_roughness
});


export const createKnightMaterialObsidian = () => new THREE.MeshStandardMaterial({
    map: textureLoader.load('Textures_knight/Black/Material_1/Material_1_Black_knight_diffuse.png'),
    normalMap: textureLoader.load('Textures_knight/Black/Material_1/Material_1_Black_knight_normal.png'),
    displacementMap: textureLoader.load('Textures_knight/Black/Material_1/Material_1_Black_knight_displace.png')*0.5,
    metalness: Black_metalness,
    roughness: Black_roughness
});


export const createKnightMaterialObsidianM = () => new THREE.MeshStandardMaterial({
    map: textureLoader.load('Textures_knight/Black/Material_3/Material_3_Black_knight_diffuse.png'),
    normalMap: textureLoader.load('Textures_knight/Black/Material_3/Material_3_Black_knight_normal.png'),
    displacementMap: textureLoader.load('Textures_knight/Black/Material_3/Material_3_Black_knight_displace.png')*0.5,
    metalness: White_metalness,
    roughness: White_roughness
});

export const createKnightMaterialMarble = () => new THREE.MeshStandardMaterial({
    map: textureLoader.load('Textures_knight/White/Material_1/Material_1_White_knight_diffuse.png'),
    normalMap: textureLoader.load('Textures_knight/White/Material_1/Material_1_White_knight_normal.png'),
    displacementMap: textureLoader.load('Textures_knight/White/Material_1/Material_1_White_knight_displace.png')*0.5,
    metalness: White_metalness,
    roughness: White_roughness
});

export const createKnightMaterialMarbleO = () => new THREE.MeshStandardMaterial({
    map: textureLoader.load('Textures_knight/White/Material_3/Material_3_White_knight_diffuse.png'),
    normalMap: textureLoader.load('Textures_knight/White/Material_3/Material_3_White_knight_normal.png'),
    displacementMap: textureLoader.load('Textures_knight/White/Material_3/Material_3_White_knight_displace.png')*0.5,
    metalness: Black_metalness,
    roughness: Black_roughness
});

export const green = () => new THREE.MeshStandardMaterial({
    color: 0x0b4f1d,         // Kolor podstawowy (np. zielony)
    emissive: 0x000000,      // Kolor emisji (np. czarny)
    emissiveIntensity: 1,    // Intensywność emisji
    metalness: 0.5,          // Metaliczność (opcjonalnie)
    roughness: 0.5           // Chropowatość (opcjonalnie)
});
export const yellow = () => new THREE.MeshStandardMaterial({
    color: 0xc2c28c,         // Kolor podstawowy (np. zielony)
    emissive: 0x000000,      // Kolor emisji (np. czarny)
    emissiveIntensity: 1,    // Intensywność emisji
    metalness: 0.5,          // Metaliczność (opcjonalnie)
    roughness: 0.5           // Chropowatość (opcjonalnie)
});