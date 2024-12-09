from PIL import Image


# Otwórz dwa obrazy


def split_textures(Piec_type):
    """
    :param Piec_type: Rodziaj pionka zawierającego 3 materiały horse/queen/king
    :return: None
    zapisuje wszystkie niezbędne tekstury
    """
    """
    Ścieżki wygenerowane z blendera niezbędne:
    """
    Path_material1_mask = f'Textures_{Piec_type}/tex1_mask.png'
    Path_material2_mask = f'Textures_{Piec_type}/tex2_mask.png'
    Path_material3_mask = f'Textures_{Piec_type}/tex3_mask.png'

    Mask1 = Image.open(Path_material1_mask).convert('RGBA')
    Mask2 = Image.open(Path_material2_mask).convert('RGBA')
    Mask3 = Image.open(Path_material3_mask).convert('RGBA')
    pixels_Mask1 = Mask1.load()
    pixels_Mask2 = Mask2.load()
    pixels_Mask3 = Mask3.load()

    Path_glossy = f'Textures_{Piec_type}/{Piec_type}_glossy.png'
    Glossy = Image.open(Path_glossy).convert('RGBA')
    pixels_Glossy = Glossy.load()

    Path_White_diffuse = f'Textures_{Piec_type}/White/White_{Piec_type}_diffuse.png'
    Path_White_normal = f'Textures_{Piec_type}/White/White_{Piec_type}_normal.png'
    Path_White_displace = f'Textures_{Piec_type}/White/White_{Piec_type}_displace.png'

    Path_Black_diffuse = f'Textures_{Piec_type}/Black/Black_{Piec_type}_diffuse.png'
    Path_Black_normal = f'Textures_{Piec_type}/Black/Black_{Piec_type}_normal.png'
    Path_Black_displace = f'Textures_{Piec_type}/Black/Black_{Piec_type}_displace.png'

    W_diff_img = Image.open(Path_White_diffuse).convert('RGBA')
    W_nor_img = Image.open(Path_White_normal).convert('RGBA')
    W_displ_img = Image.open(Path_White_displace).convert('RGBA')

    B_diff_img = Image.open(Path_Black_diffuse).convert('RGBA')
    B_nor_img = Image.open(Path_Black_normal).convert('RGBA')
    B_displ_img = Image.open(Path_Black_displace).convert('RGBA')

    pixels_W_diff = W_diff_img.load()
    pixels_W_nor = W_nor_img.load()
    pixels_W_displ = W_displ_img.load()

    pixels_B_diff = B_diff_img.load()
    pixels_B_nor = B_nor_img.load()
    pixels_B_displ = B_displ_img.load()

    """
    Połączenie dla uzyskania efektu metalu:
    """
    Path_White_combine = f'Textures_{Piec_type}/White/White_{Piec_type}_combine.png'
    Path_Black_combine = f'Textures_{Piec_type}/Black/Black_{Piec_type}_combine.png'

    width, height = W_diff_img.size
    W_combine_img = Image.new('RGBA', (width, height))
    B_combine_img = Image.new('RGBA', (width, height))
    pixels_W_combine = W_combine_img.load()
    pixels_B_combine = B_combine_img.load()

    """
    Podział na materiały
    """
    Path_Material_1_White_diffuse = f'Textures_{Piec_type}/White/Material_1/Material_1_White_{Piec_type}_diffuse.png'
    Path_Material_1_White_normal = f'Textures_{Piec_type}/White/Material_1/Material_1_White_{Piec_type}_normal.png'
    Path_Material_1_White_displace = f'Textures_{Piec_type}/White/Material_1/Material_1_White_{Piec_type}_displace.png'

    Path_Material_2_White_diffuse = f'Textures_{Piec_type}/White/Material_2/Material_2_White_{Piec_type}_diffuse.png'
    Path_Material_2_White_normal = f'Textures_{Piec_type}/White/Material_2/Material_2_White_{Piec_type}_normal.png'
    Path_Material_2_White_displace = f'Textures_{Piec_type}/White/Material_2/Material_2_White_{Piec_type}_displace.png'

    Path_Material_3_White_diffuse = f'Textures_{Piec_type}/White/Material_3/Material_3_White_{Piec_type}_diffuse.png'
    Path_Material_3_White_normal = f'Textures_{Piec_type}/White/Material_3/Material_3_White_{Piec_type}_normal.png'
    Path_Material_3_White_displace = f'Textures_{Piec_type}/White/Material_3/Material_3_White_{Piec_type}_displace.png'

    Path_Material_1_Black_diffuse = f'Textures_{Piec_type}/Black/Material_1/Material_1_Black_{Piec_type}_diffuse.png'
    Path_Material_1_Black_normal = f'Textures_{Piec_type}/Black/Material_1/Material_1_Black_{Piec_type}_normal.png'
    Path_Material_1_Black_displace = f'Textures_{Piec_type}/Black/Material_1/Material_1_Black_{Piec_type}_displace.png'

    Path_Material_2_Black_diffuse = f'Textures_{Piec_type}/Black/Material_2/Material_2_Black_{Piec_type}_diffuse.png'
    Path_Material_2_Black_normal = f'Textures_{Piec_type}/Black/Material_2/Material_2_Black_{Piec_type}_normal.png'
    Path_Material_2_Black_displace = f'Textures_{Piec_type}/Black/Material_2/Material_2_Black_{Piec_type}_displace.png'

    Path_Material_3_Black_diffuse = f'Textures_{Piec_type}/Black/Material_3/Material_3_Black_{Piec_type}_diffuse.png'
    Path_Material_3_Black_normal = f'Textures_{Piec_type}/Black/Material_3/Material_3_Black_{Piec_type}_normal.png'
    Path_Material_3_Black_displace = f'Textures_{Piec_type}/Black/Material_3/Material_3_Black_{Piec_type}_displace.png'

    W_M1_diff_img = Image.new('RGBA', (width, height))
    W_M1_nor_img = Image.new('RGBA', (width, height))
    W_M1_displ_img = Image.new('RGBA', (width, height))

    W_M2_diff_img = Image.new('RGBA', (width, height))
    W_M2_nor_img = Image.new('RGBA', (width, height))
    W_M2_displ_img = Image.new('RGBA', (width, height))

    W_M3_diff_img = Image.new('RGBA', (width, height))
    W_M3_nor_img = Image.new('RGBA', (width, height))
    W_M3_displ_img = Image.new('RGBA', (width, height))

    B_M1_diff_img = Image.new('RGBA', (width, height))
    B_M1_nor_img = Image.new('RGBA', (width, height))
    B_M1_displ_img = Image.new('RGBA', (width, height))

    B_M2_diff_img = Image.new('RGBA', (width, height))
    B_M2_nor_img = Image.new('RGBA', (width, height))
    B_M2_displ_img = Image.new('RGBA', (width, height))

    B_M3_diff_img = Image.new('RGBA', (width, height))
    B_M3_nor_img = Image.new('RGBA', (width, height))
    B_M3_displ_img = Image.new('RGBA', (width, height))

    pixels_W_M1_diff = W_M1_diff_img.load()
    pixels_W_M1_nor = W_M1_nor_img.load()
    pixels_W_M1_displ = W_M1_displ_img.load()

    pixels_W_M2_diff = W_M2_diff_img.load()
    pixels_W_M2_nor = W_M2_nor_img.load()
    pixels_W_M2_displ = W_M2_displ_img.load()

    pixels_W_M3_diff = W_M3_diff_img.load()
    pixels_W_M3_nor = W_M3_nor_img.load()
    pixels_W_M3_displ = W_M3_displ_img.load()

    pixels_B_M1_diff = B_M1_diff_img.load()
    pixels_B_M1_nor = B_M1_nor_img.load()
    pixels_B_M1_displ = B_M1_displ_img.load()

    pixels_B_M2_diff = B_M2_diff_img.load()
    pixels_B_M2_nor = B_M2_nor_img.load()
    pixels_B_M2_displ = B_M2_displ_img.load()

    pixels_B_M3_diff = B_M3_diff_img.load()
    pixels_B_M3_nor = B_M3_nor_img.load()
    pixels_B_M3_displ = B_M3_displ_img.load()

    """Wczytaj obrazy"""

    for y in range(width):
        for x in range(height):
            r, g, b, a = pixels_Glossy[x, y]
            if r > 200 and g > 150 and b < 70 and a > 0:
                pixels_W_combine[x, y] = pixels_Glossy[x, y]
                pixels_B_combine[x, y] = pixels_Glossy[x, y]
            else:
                pixels_W_combine[x, y] = pixels_W_diff[x, y]
                pixels_B_combine[x, y] = pixels_B_diff[x, y]
    W_combine_img.save(Path_White_combine)
    B_combine_img.save(Path_Black_combine)

    for y in range(width):
        for x in range(height):
            Mask1_r, Mask1_g, Mask1_b, Mask1_a = pixels_Mask1[x, y]
            Mask2_r, Mask2_g, Mask2_b, Mask2_a = pixels_Mask2[x, y]
            Mask3_r, Mask3_g, Mask3_b, Mask3_a = pixels_Mask3[x, y]

            if Mask1_r > 240 and Mask1_g > 240 and Mask1_b > 240:
                pixels_W_M1_diff[x, y] = pixels_W_combine[x, y]
                pixels_B_M1_diff[x, y] = pixels_B_combine[x, y]
                pixels_W_M1_nor[x, y] = pixels_W_nor[x, y]
                pixels_B_M1_nor[x, y] = pixels_B_nor[x, y]
                pixels_W_M1_displ[x, y] = pixels_W_displ[x, y]
                pixels_B_M1_displ[x, y] = pixels_B_displ[x, y]
            else:
                pixels_W_M1_diff[x, y] = (0, 0, 0, 0)
                pixels_B_M1_diff[x, y] = (0, 0, 0, 0)
                pixels_W_M1_nor[x, y] = (0, 0, 0, 0)
                pixels_B_M1_nor[x, y] = (0, 0, 0, 0)
                pixels_W_M1_displ[x, y] = (0, 0, 0, 0)
                pixels_B_M1_displ[x, y] = (0, 0, 0, 0)

            if Mask2_r  > 240 and Mask2_g  > 240 and Mask2_b  > 240:
                pixels_W_M2_diff[x, y] = pixels_W_combine[x, y]
                pixels_B_M2_diff[x, y] = pixels_B_combine[x, y]
                pixels_W_M2_nor[x, y] = pixels_W_nor[x, y]
                pixels_B_M2_nor[x, y] = pixels_B_nor[x, y]
                pixels_W_M2_displ[x, y] = pixels_W_displ[x, y]
                pixels_B_M2_displ[x, y] = pixels_B_displ[x, y]
            else:
                pixels_W_M2_diff[x, y] = (0, 0, 0, 0)
                pixels_B_M2_diff[x, y] = (0, 0, 0, 0)
                pixels_W_M2_nor[x, y] = (0, 0, 0, 0)
                pixels_B_M2_nor[x, y] = (0, 0, 0, 0)
                pixels_W_M2_displ[x, y] = (0, 0, 0, 0)
                pixels_B_M2_displ[x, y] = (0, 0, 0, 0)

            if Mask3_r  > 240 and Mask3_g  > 240 and Mask3_b > 240:
                pixels_W_M3_diff[x, y] = pixels_W_combine[x, y]
                pixels_B_M3_diff[x, y] = pixels_B_combine[x, y]
                pixels_W_M3_nor[x, y] = pixels_W_nor[x, y]
                pixels_B_M3_nor[x, y] = pixels_B_nor[x, y]
                pixels_W_M3_displ[x, y] = pixels_W_displ[x, y]
                pixels_B_M3_displ[x, y] = pixels_B_displ[x, y]
            else:
                pixels_W_M3_diff[x, y] = (0, 0, 0, 0)
                pixels_B_M3_diff[x, y] = (0, 0, 0, 0)
                pixels_W_M3_nor[x, y] = (0, 0, 0, 0)
                pixels_B_M3_nor[x, y] = (0, 0, 0, 0)
                pixels_W_M3_displ[x, y] = (0, 0, 0, 0)
                pixels_B_M3_displ[x, y] = (0, 0, 0, 0)

    W_M1_diff_img.save(Path_Material_1_White_diffuse)
    W_M1_nor_img.save(Path_Material_1_White_normal)
    W_M1_displ_img.save(Path_Material_1_White_displace)

    W_M2_diff_img.save(Path_Material_2_White_diffuse)
    W_M2_nor_img.save(Path_Material_2_White_normal)
    W_M2_displ_img.save(Path_Material_2_White_displace)

    W_M3_diff_img.save(Path_Material_3_White_diffuse)
    W_M3_nor_img.save(Path_Material_3_White_normal)
    W_M3_displ_img.save(Path_Material_3_White_displace)

    B_M1_diff_img.save(Path_Material_1_Black_diffuse)
    B_M1_nor_img.save(Path_Material_1_Black_normal)
    B_M1_displ_img.save(Path_Material_1_Black_displace)

    B_M2_diff_img.save(Path_Material_2_Black_diffuse)
    B_M2_nor_img.save(Path_Material_2_Black_normal)
    B_M2_displ_img.save(Path_Material_2_Black_displace)

    B_M3_diff_img.save(Path_Material_3_Black_diffuse)
    B_M3_nor_img.save(Path_Material_3_Black_normal)
    B_M3_displ_img.save(Path_Material_3_Black_displace)


split_textures("horse")
