import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteIcon from '@material-ui/icons/Delete';
import CancelIcon from '@material-ui/icons/CancelOutlined';
import HomeNavbar from './navbar.js';
const Background = require("../images/particles3.jpg");

var demo = {
	className: "img-fluid",
	backgroundImage: `url(${Background})`,
};

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.imageInputType = null; // either mainImage or additionalImage
        this.state = {
            productName: '',
            productPrice: '',
            stock: '',
            selectedCategoryName: '',
            selectedCategoryId: null,
            categories: [],
            deliveryDays: '',
            mainPhoto: null,
            mainPhotoPath: '',
            productDescription: '',
            productFeatures: [],
            featureInput: '',
            options: [],
            availableOptions: ['colors', 'size', 'storage'],
            additionalImages: [],
            additionalImageInput: '',
            selectlabel: [],
            update: false
        }
        this.mainPhotoChange = this.mainPhotoChange.bind(this);
        this.onCategoryChange = this.onCategoryChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFileReader = this.handleFileReader.bind(this);
        this.addFeature = this.addFeature.bind(this);
        this.addAdditionalImage = this.addAdditionalImage.bind(this);
        this.deleteFeature = this.deleteFeature.bind(this);
        this.deleteAdditionalImage = this.deleteAdditionalImage.bind(this);
    }

    deleteAdditionalImage(index) {
        let {additionalImages} = this.state;
        additionalImages.splice(index, 1);
        this.setState({additionalImages});
    }

    deleteFeature(index) {
        let {productFeatures} = this.state;
        productFeatures.splice(index, 1);
        this.setState({productFeatures});
    }

    addAdditionalImage(e) {
        // e.preventDefault();
        if(this.state.additionalImages.length <= 2) {
            this.imageInputType = 'additionalImage';
            this.fileReader.readAsDataURL(e.target.files[0]); 
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        let { productName: name, productPrice: price, stock: stock, selectedCategoryId: category_id, deliveryDays: estimated_days_to_deliver_by_seller, mainPhoto: main_photo, productFeatures: features, availableOptions: options, productDescription: description, additionalImages, update } = this.state

        // by default first one is selected
        if (category_id === null) {
            category_id = this.state.categories[0]._id;
        }

        let obj = { name, price, stock, category_id, estimated_days_to_deliver_by_seller, options, main_photo, features, description, additionalImages}
        
        let url = 'http://localhost:5000/seller/';
        if(this.state.update) {
            url += 'update_product';
            obj.product_id = this.state.product_id;
            obj.imagesChanged = true;
        }
        else {
            url += 'addProduct';
        }

        // console.log(url, obj);

        fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json', 'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(obj)
        })
            .then((res) => {
                // console.log(res);
                if (res.ok) {
                    console.log('success, and redirected to seller profile');
                    this.props.history.goBack();
                }
                else {
                    if(res.status === 401) {
                        this.props.history.push({
                            pathname: '/Seller/Login',
                            state: {
                                isRedirected: true
                            }
                        })
                    }
                    throw 'error'
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    handleFileReader(e) {
        if (this.imageInputType === 'mainPhoto')
            this.setState({ mainPhoto: e.target.result })

        if (this.imageInputType === 'additionalImage') {
            let { additionalImages } = this.state;
            additionalImages.push(e.target.result);
            this.setState({ additionalImages });
        }
        this.imageInputType = null;
    }
    
    mainPhotoChange(e) {
        this.imageInputType = 'mainPhoto';
        this.fileReader.readAsDataURL(e.target.files[0]);
        // this.setState({ mainPhotoPath: e.target.value })
    }

    onCategoryChange(e) {
        let { categories, selectedCategoryId, selectedCategoryName } = this.state;
        categories.forEach((category) => {
            if (category.name === e.target.value) {
                selectedCategoryId = category._id;
                selectedCategoryName = category.name;
            }
        });

        this.setState({ categories, selectedCategoryId, selectedCategoryName });
    }

    addFeature() {
        let { featureInput, productFeatures } = this.state;
        if (featureInput.length == 0) {
            return;
        }
        else {
            productFeatures.push(featureInput);
            featureInput = ''
            this.setState({ featureInput, productFeatures })
        }
    }
    componentDidMount() {
        // console.log(this.props.location.state);
        if(this.props.location && this.props.location.state && this.props.location.state.update) {
            let id = this.props.location.state.product._id;
            this.setState({update: true, product_id: id});

            fetch(`http://localhost:5000/product/details?product_id=${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((res) => {
                    // if(res.ok)
                        return res.json()
                    // else
                        // raise 'error'
                })
                .then((res) => {
                    // console.log(res);
                    let {product} = res;
                    // console.log(product);
                    let {name: productName, price: productPrice, stock: stock, description: productDescription, estimated_days_to_deliver_by_seller: deliveryDays, main_photo: mainPhoto, features: productFeatures} = product;
                    // console.log({productName, productPrice, productDescription, deliveryDays, mainPhoto, productFeatures});
                    this.setState({productName, productPrice, stock, productDescription, deliveryDays, mainPhoto, productFeatures});
                    // this.setState({: res.categories })
                })
                .catch((err) => {
                    console.log(err)
                })
                
            fetch(`http://localhost:5000/product/images?product_id=${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })  
                .then((res) => {
                    // if(res.ok)
                        return res.json()
                    // else
                        // raise 'error'
                })
                .then((res) => {
                    // console.log(res);
                    this.setState({additionalImages: res.images});
                    // this.setState({: res.categories })
                })
                .catch((err) => {
                    console.log(err)
                })

        }
        fetch(`http://localhost:5000/category/getAllCategories`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then((res) => {
                this.setState({ categories: res.categories })
            })
            .catch((err) => {
                console.log(err)
            })
        this.fileReader = new FileReader();

        // event listener of fileReader
        this.fileReader.onload = this.handleFileReader
    }



    render() {
        var features = this.state.productFeatures.map((feature, index) => {
            return <li key={index}>
                <div className='d-flex flex-row justify-content-center'>
                    <div className='flex-grow-1'>{feature}</div>
                    <div className='mr-3'>
                        <button style={{border: '0px', backgroundColor: 'inherit'}} onClick={() => {this.deleteFeature(index)}} >
                            <DeleteIcon />
                        </button>
                    </div>
                </div>
            </li>
        })
        
        var featureTag = (this.state.productFeatures.length > 0 && <ul>{features}</ul>);
        
        var images = this.state.additionalImages.map((image, index) => {
            return <div key={index} className='p-2 m-2 rounded d-flex flex-row' style={{position: 'relative'}}>
                <img className='rounded m-0 p-0' src={image} style={{ height: '300px', width: '100%' }} />
                <div className='m-0 p-0'>
                    <button onClick={() =>{ this.deleteAdditionalImage(index) }} style={{border: '0px', backgroundColor: 'inherit', transform: 'translateY(-100%)'}}>
                        <CancelIcon style={{color: 'black'}}/>
                    </button>
                </div>
                {/* <div style={{position: 'absolute', top: '0px', right: '0px', filter: 'blur(3px)'}}><CancelIcon /></div> */}
                {/* <div style={{position: 'absolute', top: '0px', right: '0px'}}> */}
                {/*     <button onClick={() =>{ this.deleteAdditionalImage(index) }} style={{border: '0px', backgroundColor: 'inherit'}}> */}
                {/*         <CancelIcon style={{color: 'black'}}/> */}
                {/*     </button> */}
                {/* </div> */}
            </div>
        });

        return (
            <div>
                <HomeNavbar type='Add Product.' />
                <div style={demo}>
                    <div style={{height:'100px'}}>

                    </div>

                    <div>
                    <div className="row">
                        <div className="col-sm-1">

                        </div>

                        <div className="col-sm-4" style={{backgroundColor:'white'}}>
                            <form onSubmit={this.handleSubmit} style={{paddingBottom: '10px'}}>
                                <hr />
                                <div>
                                    <h2 style={{ fontFamily: 'Courier New', textAlign: 'left', color: '#031dad', fontWeight: 'bold', verticalAlign: 'middle' }}>
                                        Product Details.
                                    </h2>
                                    <TextField
                                        id="productName"
                                        label="Product Name"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        value={this.state.productName}
                                        onChange={(event) => this.setState({ productName: event.target.value })}
                                    />
                                    <div style={{ height: '30px' }}>

                                    </div>
                                    <TextField
                                        type="number"
                                        id="productPrice"
                                        label="Product Price"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        value={this.state.productPrice}
                                        onChange={(event) => {
                                            if (event.target.value < 0)
                                                return
                                            else
                                                this.setState({ productPrice: event.target.value })
                                        }}
                                    />
                                    <div style={{ height: '30px' }}>

                                    </div>
                                    <TextField
                                        id="category"
                                        select
                                        label="Select Category"
                                        variant="outlined"
                                        fullWidth
                                        defaultValue="select"
                                        inputRef={el => this.selectedCategoryName = el}
                                        onChange={this.onCategoryChange}
                                    >
                                        {this.state.categories.map((option, index) => 
                                            <MenuItem key={index} value={option.name}>
                                                {option.name}
                                            </MenuItem>
                                        //)
                                        )}
                                    </TextField>
                                    <div style={{ height: '30px' }}>

                                    </div>
                                    <TextField
                                        type="number"
                                        id="stock"
                                        label="Item in Stock"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        value={this.state.stock}
                                        onChange={(event) => {
                                            if (event.target.value < 0)
                                                return
                                            else
                                                this.setState({ stock: event.target.value })
                                        }}
                                    />
                                </div>

                                <hr />
                                <div>
                                    <h2 style={{ fontFamily: 'Courier New', textAlign: 'left', color: '#031dad', fontWeight: 'bold', verticalAlign: 'middle' }}>
                                        Max Deliver Days.
                                    </h2>
                                    <TextField
                                        type="number"
                                        id="deliveryDays"
                                        label="Max Delivery Days"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        value={this.state.deliveryDays}
                                        onChange={(event) => {
                                            if (event.target.value < 0)
                                                return
                                            else
                                                this.setState({ deliveryDays: event.target.value })
                                        }}
                                    />
                                </div>

                                <hr />

                                <div>
                                    <h2 style={{ fontFamily: 'Courier New', textAlign: 'left', color: '#031dad', fontWeight: 'bold', verticalAlign: 'middle' }}>
                                        Upload Image.
                                    </h2>

                                    <input
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        id="raised-button-file"
                                        multiple
                                        type="file"
                                        value={this.mainPhotoPath}
                                        onChange={this.mainPhotoChange}
                                        onClick={(event) => { event.target.value = null }}
                                    />
                                    <label htmlFor="raised-button-file">
                                        <Button variant="contained" component="span" size="large" color="primary" fullWidth>
                                            Upload
                                        </Button>
                                    </label>
                                </div>

                                <hr />

                                <div>
                                    <h2 style={{ fontFamily: 'Courier New', textAlign: 'left', color: '#031dad', fontWeight: 'bold', verticalAlign: 'middle' }}>
                                        Product Description.
                                    </h2>
                                    <TextField
                                        id="productDescription"
                                        label="Product Description"
                                        variant="outlined"
                                        multiline
                                        required
                                        fullWidth
                                        value={this.state.productDescription}
                                        onChange={(e) => { this.setState({ productDescription: e.target.value }) }}
                                    />
                                </div>

                                <hr />

                                <div>
                                    <h2 style={{ fontFamily: 'Courier New', textAlign: 'left', color: '#031dad', fontWeight: 'bold', verticalAlign: 'middle' }}>
                                        Product Feature.
                                    </h2>
                                    <TextField
                                        placeholder="Product Feature"
                                        label="Product Features"
                                        id="featureInput"
                                        variant="outlined"
                                        fullWidth
                                        value={this.state.featureInput}
                                        onChange={(e) => { this.setState({ featureInput: e.target.value }) }}
                                    />
                                    <div style={{ height: '20px' }}>

                                    </div>
                                    <Button variant="contained" component="span" size="large" color="primary" onClick={this.addFeature} fullWidth>
                                        Add Feature
                                    </Button>
                                </div>

                                <hr />

                                <div>
                                    <h2 style={{ fontFamily: 'Courier New', textAlign: 'left', color: '#031dad', fontWeight: 'bold', verticalAlign: 'middle' }}>
                                        Add More Images.
                                    </h2>
                                    <input
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        id="raised-button-file1"
                                        type="file"
                                        value={this.mainPhotoPath}
                                        onChange={this.addAdditionalImage}
                                        onClick={(event) => { event.target.value = null }}
                                        
                                    />
                                    <label htmlFor="raised-button-file1">
                                        <Button variant="contained" component="span" size="large" color="primary" fullWidth>
                                            Upload
                                        </Button>
                                    </label>
                                
                                </div>


                                <Button color="primary" size="large" variant="contained" type="submit" fullWidth>
                                    confirm
                                </Button>

                            </form>
                        </div>

                        <div className="col-sm-2" style={{backgroundColor:'white'}}>

                        </div>

                        <div className="col-sm-4" style={{backgroundColor:'white'}}>
                            <div style={{ height: '30px' }}>

                            </div>
                            {this.state.mainPhoto !== null && <div>
                                <label>
                                    <h2 style={{ fontFamily: 'Courier New', textAlign: 'left', color: '#031dad', fontWeight: 'bold', verticalAlign: 'middle' }}>
                                        Thumbnail.
                                    </h2>
                                </label>
                                <img style={{ height: '300px', width: '100%' }} src={this.state.mainPhoto} alt='main photo preview' />
                            </div>}

                            <hr />

                            <div>
                                <h2 style={{ fontFamily: 'Courier New', textAlign: 'left', color: '#031dad', fontWeight: 'bold', verticalAlign: 'middle' }}>
                                    Features
                                </h2>
                                <div>
                                    {featureTag}
                                </div>
                            </div>

                            <hr />
                            
                            <div>
                                {this.state.additionalImages.length > 0 && <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                    <h2 style={{ fontFamily: 'Courier New', textAlign: 'left', color: '#031dad', fontWeight: 'bold', verticalAlign: 'middle' }}>
                                        Images.
                                    </h2>
                                    <div>
                                        {images}
                                        <hr />
                                    </div>
                                </div>}
                            </div>

                        </div>

                        <div className="col-sm-1">

                        </div>
                        </div>

                        <div style={{height:'100px'}}>

                        </div>
                    </div>

                </div>
            </div>
        );
    }
}


export default AddProduct;