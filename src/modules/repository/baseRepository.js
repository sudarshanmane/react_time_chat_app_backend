export const baseRepository = {
  async createOne(data) {
    return this.model.insertOne(data);
  },
  async findOne(query = {}) {
    return this.model.findOne(query);
  },
  async find(query = {}, options = {}) {
    let dbQuery = this.model.find(query);

    if (options.populate) {
      const populates = Array.isArray(options.populate)
        ? options.populate
        : [options.populate];

      populates.forEach((populate) => {
        dbQuery = dbQuery.populate(populate);
      });
    }

    if (options.sort) {
      dbQuery = dbQuery.sort(options.sort);
    }

    if (options.select) {
      dbQuery = dbQuery.select(options.select);
    }

    if (options.limit) {
      dbQuery = dbQuery.limit(options.limit);
    }

    return dbQuery;
  },
  async updateOne(query = {}, data) {
    return this.model.updateOne(query, data);
  },
  async deleteOne(query = {}) {
    return this.model.deleteOne(query);
  },
};
