// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    // slug: string;
  };
  
  export type LoginResponseData = {
    token: string;
    issuedAt: Date;
    expirtionDate: Date;
    user: User;
  };