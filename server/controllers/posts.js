import Image from "../models/Image.js";

export const uploadImage = async (req, res) => {
  try {
    const { title, tags} = req.body;
    const imageUrl = req.file.path;
    // console.log(image);
    // Assuming "title" and "imageUrl" are sent in the request body
    const newImage = new Image({ title, imageUrl, tags });
    await newImage.save();

    res.json({ message: "Image uploaded successfully", image: newImage });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "Error uploading image" });
  }
};

export const getAllImages = async (req, res) => {
  try {
    const images = await Image.find();
    
    res.json(images);
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ error: "Error fetching images" });
  }
};
export const searchImages= async (req, res) => {
  const { query } = req.query;
  try {
    // Perform a case-insensitive search using a regular expression
    const images = await Image.find({ tags: { $regex: new RegExp(query, 'i') } });
    
    res.json(images);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getImageById = async (req, res) => {
  try {
    const imageId = req.params.id;
    const image = await Image.findById(imageId);

    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    res.json(image);
  } catch (error) {
    console.error("Error fetching image:", error);
    res.status(500).json({ error: "Error fetching image" });
  }
};

export const addComment = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    const { text, username } = req.body;
    image.comments.push({text, username});
    await image.save();

    res.json(image);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ error: "Error adding comment" });
  }
};

export const getComments = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }
    res.json(image.comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error getting likes" });
  }
};

export const likeImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }
    console.log(req.body);
    // Increment the like count and save the image
    req.body.isLiked?image.likes--:image.likes++;
     
    await image.save();

    res.json(image);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error liking" });
  }
};

export const getLikes = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.json(image.likes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error getting likes" });
  }
};

 export const downloadImage= async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
  
    // Get the file path of the image
    const filePath = image.imageUrl;

    // Send the image file for download
    res.download(filePath);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
}
