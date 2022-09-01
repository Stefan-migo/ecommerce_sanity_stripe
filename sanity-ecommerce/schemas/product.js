//create a custom schema
//a default schema has a name, title, type and field.
//this is a product schemma.
export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'image', //the product will have an image.
      title: 'Image',
      type: 'array', //it will be an array of images
      of: [{ type: 'image' }],
      options: { 
        hotspot: true, //this allow us to responsively adapt images to different aspect ratios at display time.
      }
    },
    { 
      name: 'name', //the product will have a name
      title: 'Name',
      type: 'string', // string type
    },
    { 
      name: 'slug', // the product will have a slug
      title: 'Slug',
      type: 'slug', // slug type is a sort of url
      options: {
        source: 'name', // the slug will be based on the name
        maxLength: 90,
      }
    },
    { 
      name: 'price', // the product will have a price
      title: 'Price',
      type: 'number', // type number
    },
    { 
      name: 'details', // the product will have a description or details.
      title: 'Details',
      type: 'string', //string type.
    }
  ]
}