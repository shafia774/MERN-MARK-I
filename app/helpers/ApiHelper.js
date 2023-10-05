class APIFeatures {
  constructor(query, queryParameters) {
    this.query = query;
    this.queryParameters = queryParameters;
  }

  filter() {
    const parameters = { ...this.queryParameters };
    const excludedFields = ['page', 'sort', 'limit', 'fields','coordinates','range'];
    excludedFields.forEach(field => delete parameters[field]);

    // 1B) Advanced filtering
    let filterQuery = JSON.stringify(parameters);
    filterQuery = filterQuery.replace(/\b(gte|gt|lte|lt)\b/g, match  => `$${match }`);

    this.query = this.query.find(JSON.parse(filterQuery));

    return this;
  }

  sort() {
    if (this.queryParameters.sort) {
      const sortBy = this.queryParameters.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  limitFields() {
    if (this.queryParameters.fields) {
      const selectedFields  = this.queryParameters.fields.split(',').join(' ');
      this.query = this.query.select(selectedFields );
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  paginate() {
    const page = this.queryParameters.page * 1 || 1;
    const limit = this.queryParameters.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }

  filterByLocation() {
    if (this.queryParameters.coordinates && this.queryParameters.range) {
      const [givenLongitude, givenLatitude] = this.queryParameters.coordinates.split(',').map(parseFloat);
      const range = this.queryParameters.range*1000;
      
      this.query = this.query.find({
        coordinates: {
          $nearSphere: {
            $geometry: {
              type: 'Point',
              coordinates: [givenLongitude, givenLatitude],
            },
            $maxDistance: range, 
          },
        },
      });      
    }
  
    return this;
  }

  // filterByLocation() {
  //   if (this.queryParameters.coordinates) {
  //     const [givenLongitude, givenLatitude] = this.queryParameters.coordinates.split(',').map(parseFloat);

  //     const range = 10000

  //     this.query = this.query.find({
  //       coordinates: {
  //         $geoWithin: {
  //           $centerSphere: [coordinates, 10 / 6371], // 10 kilometers converted to radians (6371 is the approximate radius of the Earth in kilometers)
  //         },
  //       },
  //     }).where('range').lte(10);     
  //   }
  
  //   return this;
  // }
  


  
}
module.exports = APIFeatures;
