export interface Product {
    id: string;
    name: string;
    description: string;
    imagePath: string;
    price: number;
    Category: {
      id: string;
      name: string;
      icon: string;
    };
    Ingredients: {
        name: string;
        icon: string;
        id: string
      }[]
}