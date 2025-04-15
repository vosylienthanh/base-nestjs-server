/* eslint-disable */
export default async () => {
    const t = {};
    return { "@nestjs/swagger": { "models": [[import("./modules/user/user.entity"), { "User": { id: { required: true, type: () => String }, createdAt: { required: false, type: () => Date }, updatedAt: { required: false, type: () => Date } } }]], "controllers": [[import("./modules/health-check/health-check.controller"), { "HealthCheckController": { "healthCheck": { type: String }, "memory": {} } }]] } };
};