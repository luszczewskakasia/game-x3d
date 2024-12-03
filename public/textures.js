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

const rookTextureBlack = textureLoader.load('Textures_rook/Obsydian_texture.png'); // Ścieżka do tekstury czarnego pionka
const rookNormalMapBlack = textureLoader.load('Textures_rook/Obsydian_normal.png'); // Ścieżka do mapy normalnej czarnego pionka
const rookDisplacementMapBlack = textureLoader.load('Textures_rook/Obsydian_texture_Displacment.png')*0.5; // Path to the displacement map texture
export const rookMaterialBlack = new THREE.MeshStandardMaterial({
    map: rookTextureBlack,
    normalMap: rookNormalMapBlack,
    displacementMap: rookDisplacementMapBlack,
    metalness: Black_metalness,
    roughness: Black_roughness
});
const rookTextureWhite = textureLoader.load("Textures_rook/Marble_texture.png"); // Ścieżka do tekstury czarnego pionka
const rookNormalMapWhite = textureLoader.load('Textures_rook/Marble_normal.png'); // Ścieżka do mapy normalnej czarnego pionka
export const rookMaterialWhite = new THREE.MeshStandardMaterial({
    map: rookTextureWhite,
    normalMap: rookNormalMapWhite,
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
// knight mat1
const diffuse_Wknight_mat1 = textureLoader.load('Textures_knight/White/Material_1/Material_1_White_knight_diffuse.png');
const normal_Wknight_mat1= textureLoader.load('Textures_knight/White/Material_1/Material_1_White_knight_normal.png');
const displace_Wknight_mat1 = textureLoader.load('Textures_knight/White/Material_1/Material_1_White_knight_displace.png')*0.5;
// knight mat2
const diffuse_Wknight_mat2 = textureLoader.load('Textures_knight/White/Material_2/Material_2_White_knight_diffuse.png');
const normal_Wknight_mat2= textureLoader.load('Textures_knight/White/Material_2/Material_2_White_knight_normal.png');
const displace_Wknight_mat2 = textureLoader.load('Textures_knight/White/Material_2/Material_2_White_knight_displace.png')*0.5;
// knight mat3
const diffuse_Wknight_mat3 = textureLoader.load('Textures_knight/White/Material_3/Material_3_White_knight_diffuse.png');
const normal_Wknight_mat3= textureLoader.load('Textures_knight/White/Material_3/Material_3_White_knight_normal.png');
const displace_Wknight_mat3 = textureLoader.load('Textures_knight/White/Material_3/Material_3_White_knight_displace.png')*0.5;
//Black
// knight mat1
const diffuse_Bknight_mat1 = textureLoader.load('Textures_knight/Black/Material_1/Material_1_Black_knight_diffuse.png');
const normal_Bknight_mat1= textureLoader.load('Textures_knight/Black/Material_1/Material_1_Black_knight_normal.png');
const displace_Bknight_mat1 = textureLoader.load('Textures_knight/Black/Material_1/Material_1_Black_knight_displace.png')*0.5;
// knight mat3
const diffuse_Bknight_mat3 = textureLoader.load('Textures_knight/Black/Material_3/Material_3_Black_knight_diffuse.png');
const normal_Bknight_mat3= textureLoader.load('Textures_knight/Black/Material_3/Material_3_Black_knight_normal.png');
const displace_Bknight_mat3 = textureLoader.load('Textures_knight/Black/Material_3/Material_3_Black_knight_displace.png')*0.5;


export const knight_obsidian= new THREE.MeshStandardMaterial({
    map: diffuse_Bknight_mat1,
    normalMap:normal_Bknight_mat1,
    displacementMap: displace_Bknight_mat1,
    metalness: Black_metalness,
    roughness: Black_roughness
});
export const knight_obsidian_m= new THREE.MeshStandardMaterial({
    map: diffuse_Bknight_mat3,
    normalMap:normal_Bknight_mat3,
    displacementMap: displace_Bknight_mat3,
    metalness: White_metalness,
    roughness: White_roughness

});
export const knight_gold = new THREE.MeshStandardMaterial({
    map: diffuse_Wknight_mat2,
    normalMap:normal_Wknight_mat2,
    displacementMap: displace_Wknight_mat2,
    metalness: 0.95,
    roughness: 0.1
});

export const knight_marble = new THREE.MeshStandardMaterial({
    map: diffuse_Wknight_mat1,
    normalMap:normal_Wknight_mat1,
    displacementMap: displace_Wknight_mat1,
    metalness: White_metalness,
    roughness: White_roughness
});
export const knight_marble_o = new THREE.MeshStandardMaterial({
    map: diffuse_Wknight_mat3,
    normalMap:normal_Wknight_mat3,
    displacementMap: displace_Wknight_mat3,
    metalness: Black_metalness,
    roughness: Black_roughness
});
