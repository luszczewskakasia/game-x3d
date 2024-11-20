import * as THREE from "three";


const textureLoader = new THREE.TextureLoader();
const Black_roughness = 0.5
const Black_metalness = 0.0
const White_roughness = 0.8
const White_metalness = 0.1

const pawnTextureBlack = textureLoader.load('Textures_pawn/Obsydian_texture.png');
const pawnNormalMapBlack = textureLoader.load('Textures_pawn/Obsydian_normal.png');
const pawnDisplacementMapBlack = textureLoader.load('Textures_pawn/Obsydian_texture_Displacment.png')*0.5;


export const pawnMaterialBlack = new THREE.MeshStandardMaterial({
    map: pawnTextureBlack,
    normalMap: pawnNormalMapBlack,
    displacementMap: pawnDisplacementMapBlack,
    metalness: Black_metalness,
    roughness: Black_roughness
});


const pawnTextureWhite = textureLoader.load("Textures_pawn/Marble_texture.png"); // Ścieżka do tekstury czarnego pionka
const pawnNormalMapWhite = textureLoader.load('Textures_pawn/Marble_normal.png'); // Ścieżka do mapy normalnej czarnego pionka
export const pawnMaterialWhite = new THREE.MeshStandardMaterial({
    map: pawnTextureWhite,
    normalMap: pawnNormalMapWhite,
    metalness: White_metalness,
    roughness: White_roughness
});

/// Wczytanie tekstur skoczka
const bishopTextureBlack = textureLoader.load('Textures_bishop/Obsydian_texture.png'); // Ścieżka do tekstury czarnego pionka
const bishopNormalMapBlack = textureLoader.load('Textures_bishop/Obsydian_normal.png'); // Ścieżka do mapy normalnej czarnego pionka
const bishopDisplacementMapBlack = textureLoader.load('Textures_bishop/Obsydian_texture_Displacment.png')*0.5; // Path to the displacement map texture
export const bishopMaterialBlack = new THREE.MeshStandardMaterial({
    map: bishopTextureBlack,
    normalMap: bishopNormalMapBlack,
    displacementMap: bishopDisplacementMapBlack,
    metalness: Black_metalness,
    roughness: Black_roughness
});
const bishopTextureWhite = textureLoader.load("Textures_bishop/Marble_texture.png"); // Ścieżka do tekstury czarnego pionka
const bishopNormalMapWhite = textureLoader.load('Textures_bishop/Marble_normal.png'); // Ścieżka do mapy normalnej czarnego pionka
export const bishopMaterialWhite = new THREE.MeshStandardMaterial({
    map: bishopTextureWhite,
    normalMap: bishopNormalMapWhite,
    metalness: White_metalness,
    roughness: White_roughness
});

const towerTextureBlack = textureLoader.load('Textures_tower/Obsydian_texture.png'); // Ścieżka do tekstury czarnego pionka
const towerNormalMapBlack = textureLoader.load('Textures_tower/Obsydian_normal.png'); // Ścieżka do mapy normalnej czarnego pionka
const towerDisplacementMapBlack = textureLoader.load('Textures_tower/Obsydian_texture_Displacment.png')*0.5; // Path to the displacement map texture
export const towerMaterialBlack = new THREE.MeshStandardMaterial({
    map: towerTextureBlack,
    normalMap: towerNormalMapBlack,
    displacementMap: towerDisplacementMapBlack,
    metalness: Black_metalness,
    roughness: Black_roughness
});
const towerTextureWhite = textureLoader.load("Textures_tower/Marble_texture.png"); // Ścieżka do tekstury czarnego pionka
const towerNormalMapWhite = textureLoader.load('Textures_tower/Marble_normal.png'); // Ścieżka do mapy normalnej czarnego pionka
export const towerMaterialWhite = new THREE.MeshStandardMaterial({
    map: towerTextureWhite,
    normalMap: towerNormalMapWhite,
    metalness: White_metalness,
    roughness: White_roughness
});


//White
// king mat1
const diffuse_Wking_mat1 = textureLoader.load('Textures_king/White/Material_1/Material_1_White_king_diffuse.png');
const normal_Wking_mat1= textureLoader.load('Textures_king/White/Material_1/Material_1_White_king_normal.png');
const displace_Wking_mat1 = textureLoader.load('Textures_king/White/Material_1/Material_1_White_king_displace.png')*0.5;
// king mat2
const diffuse_Wking_mat2 = textureLoader.load('Textures_king/White/Material_2/Material_2_White_king_diffuse.png');
const normal_Wking_mat2= textureLoader.load('Textures_king/White/Material_2/Material_2_White_king_normal.png');
const displace_Wking_mat2 = textureLoader.load('Textures_king/White/Material_2/Material_2_White_king_displace.png')*0.5;
// king mat3
const diffuse_Wking_mat3 = textureLoader.load('Textures_king/White/Material_3/Material_3_White_king_diffuse.png');
const normal_Wking_mat3= textureLoader.load('Textures_king/White/Material_3/Material_3_White_king_normal.png');
const displace_Wking_mat3 = textureLoader.load('Textures_king/White/Material_3/Material_3_White_king_displace.png')*0.5;
//Black
// king mat1
const diffuse_Bking_mat1 = textureLoader.load('Textures_king/Black/Material_1/Material_1_Black_king_diffuse.png');
const normal_Bking_mat1= textureLoader.load('Textures_king/Black/Material_1/Material_1_Black_king_normal.png');
const displace_Bking_mat1 = textureLoader.load('Textures_king/Black/Material_1/Material_1_Black_king_displace.png')*0.5;


export const king_obsidian= new THREE.MeshStandardMaterial({
    map: diffuse_Bking_mat1,
    normalMap:normal_Bking_mat1,
    displacementMap: displace_Bking_mat1,
    metalness: Black_metalness,
    roughness: Black_roughness

});

export const king_marble = new THREE.MeshStandardMaterial({
    map: diffuse_Wking_mat1,
    normalMap:normal_Wking_mat1,
    displacementMap: displace_Wking_mat1,
    // metalness: 0.6,
    // roughness: 1
    metalness: White_metalness,
    roughness: White_roughness
});

export const king_satin = new THREE.MeshStandardMaterial({
    map: diffuse_Wking_mat2,
    normalMap:normal_Wking_mat2,
    displacementMap: displace_Wking_mat2,
    metalness: 1,
    roughness: 1
    // metalness: Black_metalness,
    // roughness: Black_roughness
});

export const king_gold = new THREE.MeshStandardMaterial({
    map: diffuse_Wking_mat3,
    normalMap:normal_Wking_mat3,
    displacementMap: displace_Wking_mat3,
    metalness: 0.95,
    roughness: 0.1

});


//White
// queen mat1
const diffuse_Wqueen_mat1 = textureLoader.load('Textures_queen/White/Material_1/Material_1_White_queen_diffuse.png');
const normal_Wqueen_mat1= textureLoader.load('Textures_queen/White/Material_1/Material_1_White_queen_normal.png');
const displace_Wqueen_mat1 = textureLoader.load('Textures_queen/White/Material_1/Material_1_White_queen_displace.png')*0.5;
// queen mat2
const diffuse_Wqueen_mat2 = textureLoader.load('Textures_queen/White/Material_2/Material_2_White_queen_diffuse.png');
const normal_Wqueen_mat2= textureLoader.load('Textures_queen/White/Material_2/Material_2_White_queen_normal.png');
const displace_Wqueen_mat2 = textureLoader.load('Textures_queen/White/Material_2/Material_2_White_queen_displace.png')*0.5;
// queen mat3
const diffuse_Wqueen_mat3 = textureLoader.load('Textures_queen/White/Material_3/Material_3_White_queen_diffuse.png');
const normal_Wqueen_mat3= textureLoader.load('Textures_queen/White/Material_3/Material_3_White_queen_normal.png');
const displace_Wqueen_mat3 = textureLoader.load('Textures_queen/White/Material_3/Material_3_White_queen_displace.png')*0.5;
//Black
// queen mat2
const diffuse_Bqueen_mat2 = textureLoader.load('Textures_queen/Black/Material_2/Material_2_Black_queen_diffuse.png');
const normal_Bqueen_mat2= textureLoader.load('Textures_queen/Black/Material_2/Material_2_Black_queen_normal.png');
const displace_Bqueen_mat2 = textureLoader.load('Textures_queen/Black/Material_2/Material_2_Black_queen_displace.png')*0.5;

export const queen_obsidian = new THREE.MeshStandardMaterial({
    map: diffuse_Bqueen_mat2,
    normalMap:normal_Bqueen_mat2,
    displacementMap: displace_Bqueen_mat2,
    metalness: Black_metalness,
    roughness: Black_roughness

});

export const queen_satin = new THREE.MeshStandardMaterial({
    map: diffuse_Wqueen_mat3,
    normalMap:normal_Wqueen_mat3,
    displacementMap: displace_Wqueen_mat3,
    metalness: 1,
    roughness: 1
    // metalness: Black_metalness,
    // roughness: Black_roughness

});

export const queen_gold = new THREE.MeshStandardMaterial({
    map: diffuse_Wqueen_mat1,
    normalMap:normal_Wqueen_mat1,
    displacementMap: displace_Wqueen_mat1,
    metalness: 0.95,
    roughness: 0.1
    // metalness: Black_metalness,
    // roughness: Black_roughness

});

export const queen_marble = new THREE.MeshStandardMaterial({
    map: diffuse_Wqueen_mat2,
    normalMap:normal_Wqueen_mat2,
    displacementMap: displace_Wqueen_mat2,
    // metalness: 0.7,
    // roughness: 1
    metalness: White_metalness,
    roughness: White_roughness

});

//White
// horse mat1
const diffuse_Whorse_mat1 = textureLoader.load('Textures_horse/White/Material_1/Material_1_White_horse_diffuse.png');
const normal_Whorse_mat1= textureLoader.load('Textures_horse/White/Material_1/Material_1_White_horse_normal.png');
const displace_Whorse_mat1 = textureLoader.load('Textures_horse/White/Material_1/Material_1_White_horse_displace.png')*0.5;
// horse mat2
const diffuse_Whorse_mat2 = textureLoader.load('Textures_horse/White/Material_2/Material_2_White_horse_diffuse.png');
const normal_Whorse_mat2= textureLoader.load('Textures_horse/White/Material_2/Material_2_White_horse_normal.png');
const displace_Whorse_mat2 = textureLoader.load('Textures_horse/White/Material_2/Material_2_White_horse_displace.png')*0.5;
// horse mat3
const diffuse_Whorse_mat3 = textureLoader.load('Textures_horse/White/Material_3/Material_3_White_horse_diffuse.png');
const normal_Whorse_mat3= textureLoader.load('Textures_horse/White/Material_3/Material_3_White_horse_normal.png');
const displace_Whorse_mat3 = textureLoader.load('Textures_horse/White/Material_3/Material_3_White_horse_displace.png')*0.5;
//Black
// horse mat1
const diffuse_Bhorse_mat1 = textureLoader.load('Textures_horse/Black/Material_1/Material_1_Black_horse_diffuse.png');
const normal_Bhorse_mat1= textureLoader.load('Textures_horse/Black/Material_1/Material_1_Black_horse_normal.png');
const displace_Bhorse_mat1 = textureLoader.load('Textures_horse/Black/Material_1/Material_1_Black_horse_displace.png')*0.5;
// horse mat3
const diffuse_Bhorse_mat3 = textureLoader.load('Textures_horse/Black/Material_3/Material_3_Black_horse_diffuse.png');
const normal_Bhorse_mat3= textureLoader.load('Textures_horse/Black/Material_3/Material_3_Black_horse_normal.png');
const displace_Bhorse_mat3 = textureLoader.load('Textures_horse/Black/Material_3/Material_3_Black_horse_displace.png')*0.5;


export const horse_obsidian= new THREE.MeshStandardMaterial({
    map: diffuse_Bhorse_mat1,
    normalMap:normal_Bhorse_mat1,
    displacementMap: displace_Bhorse_mat1,
    metalness: Black_metalness,
    roughness: Black_roughness
});
export const horse_obsidian_m= new THREE.MeshStandardMaterial({
    map: diffuse_Bhorse_mat3,
    normalMap:normal_Bhorse_mat3,
    displacementMap: displace_Bhorse_mat3,
    metalness: White_metalness,
    roughness: White_roughness

});
export const horse_gold = new THREE.MeshStandardMaterial({
    map: diffuse_Whorse_mat2,
    normalMap:normal_Whorse_mat2,
    displacementMap: displace_Whorse_mat2,
    metalness: 0.95,
    roughness: 0.1
});

export const horse_marble = new THREE.MeshStandardMaterial({
    map: diffuse_Whorse_mat1,
    normalMap:normal_Whorse_mat1,
    displacementMap: displace_Whorse_mat1,
    metalness: White_metalness,
    roughness: White_roughness
});
export const horse_marble_o = new THREE.MeshStandardMaterial({
    map: diffuse_Whorse_mat3,
    normalMap:normal_Whorse_mat3,
    displacementMap: displace_Whorse_mat3,
    metalness: Black_metalness,
    roughness: Black_roughness
});
