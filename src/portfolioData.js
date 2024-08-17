// Import all images from the images directory
const importAll = (requireContext) => {
    return requireContext.keys().map(key => ({
        name: key.substring(2), // Remove the './' from the beginning
        src: requireContext(key).default || requireContext(key)
    }));
};

const images = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));

const imageBase = "https://github.com/JWriter20/KyliePortfolio/blob/main/src/images/";

// Function to find the image source by filename
const findImageByName = (name) => {
    const image = images.find(img => img.name === name);
    return image ? image.src : null;
};

export const portfolioItems = [
    {
        id: 1,
        title: "Butterfly on Plant",
        price: "$150",
        details: "A vibrant depiction of a butterfly resting on a green plant. This piece captures the beauty of nature in a moment of stillness.",
        imageUrl: findImageByName('butterfly_plant.jpeg')
    },
    {
        id: 2,
        title: "Flowing Leaves",
        price: "$120",
        details: "An abstract representation of leaves flowing in the wind. The piece uses soft colors to evoke a sense of calm.",
        imageUrl: findImageByName('flow_plant.jpeg') // Corrected 'flow_plany' to 'flow_plant'
    },
    {
        id: 3,
        title: "Flowering Agave",
        price: "$200",
        details: "A detailed portrayal of an agave plant in full bloom. The rich textures bring the desert plant to life.",
        imageUrl: findImageByName('flower_agave.jpeg')
    },
    {
        id: 4,
        title: "Foldy Plant",
        price: "$110",
        details: "An artistic interpretation of a plant with folded leaves. The piece plays with light and shadow to create depth.",
        imageUrl: findImageByName('foldy_plant.jpeg')
    },
    {
        id: 5,
        title: "Mini Agave",
        price: "$90",
        details: "A small yet detailed depiction of a mini agave plant. Perfect for adding a touch of nature to any space.",
        imageUrl: findImageByName('mini_agave.jpeg')
    },
    {
        id: 6,
        title: "Multi Agave",
        price: "$180",
        details: "A collection of agave plants, each with unique characteristics. The artwork showcases the diversity within the species.",
        imageUrl: findImageByName('multi_agave.jpeg')
    },
    {
        id: 7,
        title: "Orchid Beauty",
        price: "$130",
        details: "A delicate portrayal of an orchid in bloom. The soft colors and fine details make this piece a favorite among flower enthusiasts.",
        imageUrl: findImageByName('orchid.jpeg')
    },
    {
        id: 8,
        title: "Owl in the Night",
        price: "$170",
        details: "A mysterious and enchanting depiction of an owl perched in the night. The dark background contrasts with the owl's bright eyes.",
        imageUrl: findImageByName('owl.jpeg')
    },
    {
        id: 9,
        title: "Pink Agave",
        price: "$140",
        details: "A stunning representation of a pink agave plant. The unusual color palette makes this piece stand out.",
        imageUrl: findImageByName('pink_agave.jpeg')
    },
    {
        id: 10,
        title: "Pink Mini Agave",
        price: "$95",
        details: "A smaller version of the pink agave, this piece is perfect for compact spaces. It retains all the beauty of its larger counterpart.",
        imageUrl: findImageByName('pink_mini_agave.jpeg')
    },
    {
        id: 11,
        title: "Single Flower",
        price: "$80",
        details: "A simple yet elegant piece showcasing a single flower. The focus on one bloom highlights its natural beauty.",
        imageUrl: findImageByName('single_flower.jpeg')
    },
    {
        id: 12,
        title: "Skull Agave",
        price: "$220",
        details: "A unique blend of a skull and agave plant, this piece has a dark, edgy vibe. It's perfect for those who appreciate unconventional art.",
        imageUrl: findImageByName('skull_agave.jpeg')
    }
];
