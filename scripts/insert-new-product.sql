-- scripts/insert-new-product.sql

INSERT INTO public.productos (name, price, category, description, size, image_url) VALUES
('Pantalón Jogger Gris', 3500, 'pantalones', 'Pantalón jogger cómodo y versátil, ideal para el día a día o para hacer deporte.', 'S, M, L', '/placeholder.svg?height=200&width=200&text=Jogger Gris');

-- Puedes insertar más productos si lo deseas:
-- INSERT INTO public.productos (name, price, category, description, size, image_url) VALUES
-- ('Campera de Jean', 6000, 'camperas', 'Campera clásica de jean, un básico infaltable en tu guardarropas.', 'S, M, L, XL', '/placeholder.svg?height=200&width=200&text=Campera Jean');
