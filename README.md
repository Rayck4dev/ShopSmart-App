## 📱 ShopSmart  

O **ShopSmart** é um aplicativo mobile desenvolvido em **React Native + Expo**, com autenticação via **Supabase** e estilização utilizando **NativeWind/TailwindCSS**.  

--- 

## 🚀 Funcionalidades:

- 🔑 **Autenticação**: login e cadastro com Supabase  
- 📝 **Gerenciamento de listas**: criar, editar e excluir listas de compras  
- 📦 **Produtos**: adicionar, editar e remover produtos  
- 👤 **Perfil do usuário**: edição de dados e logout  
- 📜 **Histórico de compras**: visualizar listas anteriores  

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

## 🚀 Instalação e execução (Ainda em Atualização ⚠️)

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

## 🗄️ Estrutura do Banco (SQLs) (Ainda em Atualização ⚠️)

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
