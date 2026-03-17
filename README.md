## 📱 ShopSmart  

O **ShopSmart** é um aplicativo mobile desenvolvido em **React Native + Expo**, com autenticação via **Supabase** e estilização utilizando **NativeWind/TailwindCSS**.  

--- 

## 🚀 Funcionalidades:

- 🔑 **Autenticação**: login e cadastro com Supabase  
- 📝 **Gerenciamento de listas**: criar, editar e excluir listas de compras  
- 📦 **Produtos**: adicionar, editar e remover produtos  
- 👤 **Perfil do usuário**: edição de dados e logout  
---

O projeto contempla as seguintes telas: (Ainda em Atualização ⚠️)
- **Pages Introdutórias**; 
- **Login**; 
- **Cadastro**;
- **Home**;
- **Perfil**;
- **Edição de Produto**;
- **Nova Lista**;
- **Minhas Listas**;
---

## 👥 Equipe responsável
- Ana Luiza [GitHub](https://github.com/AnaLuiza2431)
- Emily Pereira [GitHub](https://github.com/Emily2311)
- Kerollayne Akemy [GitHub](https://github.com/KerollayneAkemy)
- Raycka Castro

---

## ⚙️ Tecnologias utilizadas

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)  
[![React Native](https://img.shields.io/badge/React%20Native-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactnative.dev/)  
[![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)  
[![NativeWind](https://img.shields.io/badge/NativeWind-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://www.nativewind.dev/)  
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)  
[![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)  
[![Lucide Icons](https://img.shields.io/badge/Lucide-000000?style=for-the-badge&logo=lucide&logoColor=white)](https://lucide.dev/)  
[![APIs](https://img.shields.io/badge/APIs-FF6F00?style=for-the-badge&logo=api&logoColor=white)](#)  

---

## 📂 Estrutura de pastas (Ainda em Atualização ⚠️)

```bash
ShopSmart-App/
├── app/                # Rotas e layouts (expo-router)
│   ├── (auth)/         # Telas de login e cadastro
│   ├── (tabs)/         # Telas principais (home, perfil, etc.)
│   └── _layout.tsx     # RootLayout
├── src/
│   ├── components/     # Componentes reutilizáveis
│   ├── lib/            # Configuração Supabase
│   ├── styles/         # Estilos globais
│   └── utils/          # Funções auxiliares
└── README.md
```
---

## 🚀 Instalação e execução

### Requisitos
- Node.js (versão LTS recomendada)  
- Yarn ou npm  
- Expo CLI (opcional, pode usar `npx expo`)  
- Conta no [Supabase](https://supabase.com/)  

---

### 1. Clonar o repositório

```bash
git clone https://github.com/Rayck4dev/ShopSmart-App.git
cd ShopSmart-App
```

---
### 2. Instalar dependências
Após clonar o repositório, instale as dependências do projeto:

```bash
npm install
# ou
yarn install
```

---
### 3. Rodar o projeto

```bash
npx expo start
```

## 🗄️ Estrutura do Banco (SQLs) 

### Profiles
```sql
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  name text,
  email text unique not null,
  created_at timestamp default now(),
  updated_at timestamp default now()
);
```

### Products
```sql
create table products (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  price numeric(10,2),
  owner_id uuid references profiles(id) on delete cascade,
  created_at timestamp default now()
);
```

### Lists
```sql
create table lists (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  name text not null,
  created_at timestamp default now()
);
```

### List Products
```sql
create table list_products (
  list_id uuid references lists(id) on delete cascade,
  product_id uuid references products(id) on delete cascade,
  quantity int default 1,
  primary key (list_id, product_id)
);
```

### Categories
```sql
create table categories (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  usa_valor_por_peso boolean not null default false,
  emoji text
);
```

## 🔒 Row Level Security (RLS)

Este projeto usa **Supabase RLS** para garantir que cada usuário só consiga acessar seus próprios dados.

### Profiles
```sql
create policy "Usuário só vê seu perfil"
on profiles for select
using (id = auth.uid());

create policy "Usuário só insere seu perfil"
on profiles for insert
with check (id = auth.uid());

create policy "Usuário só atualiza seu perfil"
on profiles for update
using (id = auth.uid());

create policy "Usuário só deleta seu perfil"
on profiles for delete
using (id = auth.uid());
```

### Products
```sql
CREATE POLICY "owners can view products"
ON products FOR SELECT
USING (owner_id = auth.uid());

CREATE POLICY "owners can insert products"
ON products FOR INSERT
WITH CHECK (owner_id = auth.uid());

CREATE POLICY "owners can update products"
ON products FOR UPDATE
USING (owner_id = auth.uid());

CREATE POLICY "owners can delete products"
ON products FOR DELETE
USING (owner_id = auth.uid());
```

### Lists
```sql
CREATE POLICY "owners can view lists"
ON lists FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "owners can insert lists"
ON lists FOR INSERT
WITH CHECK (user_id = auth.uid());

CREATE POLICY "owners can update lists"
ON lists FOR UPDATE
USING (user_id = auth.uid());

CREATE POLICY "owners can delete lists"
ON lists FOR DELETE
USING (user_id = auth.uid());
```

### List Products
```sql
CREATE POLICY "owners can view list_products"
ON list_products FOR SELECT
USING (
  list_id IN (SELECT id FROM lists WHERE user_id = auth.uid())
);

CREATE POLICY "owners can insert list_products"
ON list_products FOR INSERT
WITH CHECK (
  list_id IN (SELECT id FROM lists WHERE user_id = auth.uid())
);

CREATE POLICY "owners can update list_products"
ON list_products FOR UPDATE
USING (
  list_id IN (SELECT id FROM lists WHERE user_id = auth.uid())
);

CREATE POLICY "owners can delete list_products"
ON list_products FOR DELETE
USING (
  list_id IN (SELECT id FROM lists WHERE user_id = auth.uid())
);
```

### Categories
```sql
CREATE POLICY "all users can view categories"
ON categories FOR SELECT
USING (true);

insert into categories (nome, usa_valor_por_peso, emoji) values
('legumes', true, '🍅'),
('verduras', true, '🥬'),
('bebidas', false, '🥤'),
('higiene', false, '🧴'),
('padaria', true, '🥖'),
('outros', false, '📦');
```
