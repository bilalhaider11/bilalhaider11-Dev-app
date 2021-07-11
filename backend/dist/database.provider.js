"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const mongoose = require("mongoose");
exports.databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: () => mongoose.connect('mongodb+srv://bilal:bilal123@devcluster.vtac9.mongodb.net/Developer?retryWrites=true&w=majority'),
    },
];
//# sourceMappingURL=database.provider.js.map