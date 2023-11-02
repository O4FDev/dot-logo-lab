from PIL import Image, ImageDraw, ImageFont
import matplotlib.pyplot as plt
import numpy as np
import os

# Constants
IMAGE_WIDTH = 400
IMAGE_HEIGHT = 150
CIRCLE_RADIUS = 1
SPACING = 6
FONT_SIZE = 100
DPI = 100


def generate_image_from_text(font_path, text, output_path, circle_radius=CIRCLE_RADIUS, spacing=SPACING):
    """
    Generate an image from the input text and save it to the output path.
    The image will have white text on a black background, with white circles in a grid pattern at the locations
    where the text is white.

    Args:
        font_path (str): Path to the font file.
        text (str): Input text to be converted to an image.
        output_path (str): Path where the output image will be saved.
        circle_radius (float): Radius of the circles in the grid pattern.
        spacing (int): Spacing between the circles in the grid pattern.
    """
    try:
        font = ImageFont.truetype(font_path, FONT_SIZE)
    except IOError:
        print("Font file not found. Please check the font_path.")
        return

    image = Image.new('L', (IMAGE_WIDTH, IMAGE_HEIGHT), 0)
    draw = ImageDraw.Draw(image)
    draw.text((10, 10), text, font=font, fill=255)

    img_array = np.array(image)

    fig, ax = plt.subplots(figsize=(IMAGE_WIDTH / DPI, IMAGE_HEIGHT / DPI))
    ax.set_facecolor('black')
    ax.set_xlim([0, IMAGE_WIDTH])
    ax.set_ylim([0, IMAGE_HEIGHT])

    dot_pattern = []
    for i in range(0, IMAGE_WIDTH, spacing):
        row = []
        for j in range(0, IMAGE_HEIGHT, spacing):
            if img_array[j, i] == 255:
                circle = plt.Circle((i, IMAGE_HEIGHT - j),
                                    circle_radius, color='white')
                ax.add_patch(circle)
                row.append(1)
            else:
                row.append(0)
        dot_pattern.append(row)

    plt.axis('off')
    plt.savefig(output_path, dpi=DPI, bbox_inches='tight',
                pad_inches=0, facecolor='black')
    plt.close()

    text_file_path = output_path.replace('.png', '.txt')
    with open(text_file_path, 'w') as f:
        for row in dot_pattern:
            f.write(''.join(map(str, row)) + '\n')


def generate_image_from_dot_pattern(text_file_path, new_image_path):
    """
    Generate an image from a dot pattern text file.

    Args:
        text_file_path (str): Path to the text file to be converted.
        new_image_path (str): Path where the output image will be saved.
    """
    try:
        with open(text_file_path, 'r') as f:
            dot_pattern = [list(map(int, line.strip())) for line in f]
    except IOError:
        print("Text file not found. Please check the text_file_path.")
        return

    fig, ax = plt.subplots(figsize=(IMAGE_WIDTH / DPI, IMAGE_HEIGHT / DPI))
    ax.set_facecolor('black')
    ax.set_xlim([0, IMAGE_WIDTH])
    ax.set_ylim([0, IMAGE_HEIGHT])

    for i in range(len(dot_pattern)):
        for j in range(len(dot_pattern[0])):
            if dot_pattern[i][j] == 1:
                circle = plt.Circle(
                    (i * SPACING, IMAGE_HEIGHT - j * SPACING), CIRCLE_RADIUS, color='white')
                ax.add_patch(circle)

    plt.axis('off')
    plt.savefig(new_image_path, dpi=DPI, bbox_inches='tight',
                pad_inches=0, facecolor='black')
    plt.close()


# Example usage:
text = "Tekodot"
# Replace with the path to your font file
font_path = "/path/to/font/Gilroy-Regular.ttf"
output_path = "output.png"
text_file_path = "output.txt"
new_image_path = "new_output.png"

if os.path.exists(text_file_path):
    generate_image_from_dot_pattern(text_file_path, new_image_path)
else:
    generate_image_from_text(font_path, text, output_path)
