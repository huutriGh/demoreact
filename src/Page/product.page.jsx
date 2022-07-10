import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import LinearProgress from "@mui/material/LinearProgress";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { useState } from "react";
import { connect } from "react-redux"; // thu vien ket noi view vao redux
import { createStructuredSelector } from "reselect";
import { createProductStart } from "../redux/product/product.action";
import {
  selectProducts,
  selectProductStatus,
} from "../redux/product/product.selector";
import productActionType from "../redux/product/product.type";

const Product = ({ productList, status, createProduct }) => {
  const [product, setProduct] = useState({
    productId: 0,
    productName: "",
    category: "",
    price: 0,
    images: [],
  });

  const handleChange = (event) => {
    setProduct((preState) => ({
      ...preState,
      [event.target.name]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value,
    }));
  };

  const handleCreateProduct = () => {
    createProduct(product);
  };

  const handleImage = (event) => {
    const files = event.target.files;
    console.log(files);
    const images = [];
    for (let idx = 0; idx < files.length; idx++) {
      const file = files[idx];
      images.push(file);
    }
    setProduct((preState) => ({
      ...preState,
      images: images,
    }));
  };

  const handleClick = (event) => {
    event.target.value = '';
  };
  return (
    <Container>
      <Paper sx={{ padding: "20px" }} elevation={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Typography align="center" variant="h3">
              Product
            </Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              label="Product Id"
              fullWidth
              size="small"
              color="primary"
              name="productId"
              value={product.productId}
              onChange={handleChange}
              disabled
            ></TextField>
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              label="Product Name"
              fullWidth
              size="small"
              color="secondary"
              variant="outlined"
              name="productName"
              value={product.productName}
              onChange={handleChange}
            ></TextField>
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              label="Category"
              fullWidth
              size="small"
              color="secondary"
              variant="outlined"
              name="category"
              value={product.category}
              onChange={handleChange}
            ></TextField>
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              label="Price"
              fullWidth
              size="small"
              color="secondary"
              variant="outlined"
              name="price"
              value={product.price}
              onChange={handleChange}
            ></TextField>
          </Grid>
          <Grid item md={12} xs={12}>
            <Button size="medium" variant="outlined">
              Product's Image: &nbsp;
              <input  type="file" name="image" onChange={handleImage} onClick={handleClick}/>
            </Button>
          </Grid>
          <Grid item md={12} xs={12}>
            <Button
              variant="contained"
              sx={{ marginRight: "10px" }}
              disabled={status === productActionType.CREATE_PRODUCT_PROCCESING}
              onClick={handleCreateProduct}
            >
              Create
            </Button>
            <Button variant="outlined">Register</Button>
          </Grid>
          {status === productActionType.CREATE_PRODUCT_PROCCESING ? (
            <Grid item md={12} xs={12}>
              <LinearProgress />
            </Grid>
          ) : null}
          <Grid item md={12} xs={12}>
            <ImageList>
              {productList.map((item) => (
                <ImageListItem key={item.productId}>
                  <img
                    src={`https://localhost:44329/${item.imageUrl}`}
                    srcSet={`https://localhost:44329/${item.imageUrl}`}
                    alt={item.ProductName}
                    loading="lazy"
                  />
                  <ImageListItemBar
                    title={item.productName}
                    subtitle={<span>by: {item.category}</span>}
                    position="below"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

// Tạo funtion mapStateToProp lấy các selector từ selector. createStructuredSelector phải được import ở trên
const mapStateToProp = createStructuredSelector({
  productList: selectProducts,
  status: selectProductStatus,
});

const mapDispatchToProp = (dispatch) => ({
  createProduct: (productInfo) => dispatch(createProductStart(productInfo)),
});

export default connect(mapStateToProp, mapDispatchToProp)(Product);
