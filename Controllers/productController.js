import Product from '../Models/productModel.js';
import cloudinary from '../cloudinary.js';

// Create a new product
export const createProduct = async (req, res) => {
  try {
    const {name,description,price,category,stock}=req.body;
    const image=req.file.path;
    const upload_response=await cloudinary.uploader.upload(image)
    const product = new Product({
        name,description,price,category,stock,image:upload_response.secure_url
    });
    const savedProduct = await product.save();
    res.status(201).json({ success:true,message: 'Product created successfully', data: savedProduct });
  } catch (error) {
    res.status(400).json({ success:false,message: 'Failed to create product', error: error.message });
  }
};

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success:true,message: 'Products fetched successfully', data: products });
  } catch (error) {
    res.status(500).json({ success:false,message: 'Failed to fetch products', error: error.message });
  }
};

// Get a single product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json({ message: 'Product fetched successfully', data: product });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch product', error: error.message });
  }
};

// Update a product by ID
export const updateProductQuantity = async (req, res) => {
  try {
    const {action}=req.body;
    const product=await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    if(action == "increment"){
        product.stock += 1;
    }
    else if(action == "decrement"){
        if(product.stock > 1) {
            product.stock -= 1;
        }
    }
    await product.save();

    res.status(200).json({ message: 'Product updated successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to update product', error: error.message });
  }
};

// Delete a product by ID
export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product', error: error.message });
  }
};
