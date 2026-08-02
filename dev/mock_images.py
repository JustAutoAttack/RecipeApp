import os
import requests

# This dictionary maps your exact file requirements to stable URLs
image_data = {
    "garlic-butter-pasta-hero.jpg": "https://picsum.photos/seed/pasta-h/800/800",
    "garlic-butter-pasta-close-up.jpg": "https://picsum.photos/seed/pasta-c/400/400",
    "garlic-butter-pasta-ingredients.jpg": "https://picsum.photos/seed/pasta-i/400/400",
    "miso-soup-bowl.jpg": "https://picsum.photos/seed/miso/800/800",
    "beef-tacos-platter.jpg": "https://picsum.photos/seed/taco-p/800/800",
    "beef-tacos-assembly.jpg": "https://picsum.photos/seed/taco-a/400/400",
    "butter-chicken-curry.jpg": "https://picsum.photos/seed/chicken/800/800",
    "margherita-pizza-top-down.jpg": "https://picsum.photos/seed/pizza-t/800/800",
    "margherita-pizza-slice.jpg": "https://picsum.photos/seed/pizza-s/400/400",
    "margherita-pizza-oven.jpg": "https://picsum.photos/seed/pizza-o/400/400",
    "thai-green-curry.jpg": "https://picsum.photos/seed/thai/800/800",
    "french-onion-soup-gratin.jpg": "https://picsum.photos/seed/onion/800/800",
    "bibimbap-bowl.jpg": "https://picsum.photos/seed/bibimbap-b/800/800",
    "bibimbap-mix.jpg": "https://picsum.photos/seed/bibimbap-m/400/400",
    "kimchi-jar.jpg": "https://picsum.photos/seed/kimchi/800/800",
    "cured-ham-sliced.jpg": "https://picsum.photos/seed/ham/800/800",
}

output_folder = "recipe_images"

if not os.path.exists(output_folder):
    os.makedirs(output_folder)


def download_images(data, folder):
    for filename, url in data.items():
        try:
            print(f"Downloading {filename}...")
            response = requests.get(url, stream=True)
            response.raise_for_status()

            with open(os.path.join(folder, filename), "wb") as f:
                for chunk in response.iter_content(chunk_size=8192):
                    f.write(chunk)
            print(f"Successfully saved: {filename}")
        except Exception as e:
            print(f"Error downloading {filename}: {e}")


if __name__ == "__main__":
    download_images(image_data, output_folder)
