from PIL import Image

# Otwórz dwa obrazy
image1 = Image.open('Textures_king/King_oneimage_diffuse.png').convert('RGBA')
image2 = Image.open('Textures_king/King_oneimage_glossy.png').convert('RGBA')

# image1.show()
# image2.show()
# Zmieszaj obrazy (50% przezroczystości dla efektu)
if image1.size != image2.size:
    image2 = image2.resize(image1.size)

# Pobierz dane pikseli
pixels1 = image1.load()
pixels2 = image2.load()

# Iteruj przez piksele obrazu
for y in range(image1.height):
    for x in range(image1.width):
        r, g, b, a = pixels1[x, y]
        # Sprawdź, czy piksel jest czarny (z tolerancją)
        if r < 10 and g < 10 and b < 10 and a > 0:  # Upewnij się, że piksel nie jest przezroczysty
            # Zamień kolor na odpowiadający piksel z drugiego obrazu
            pixels1[x, y] = pixels2[x, y]

# Zapisz wynikowy obraz
image1.save('Textures_king/King_oneimage_combine.png')
image1.show()