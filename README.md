# worklife-technical-test

## How to setup

To run this code locally you need to :

- `cd worklife-react`
- `npm install`

then to run it you need to provide an API key for RIJKS, for that you need to:

- create a file named `.env.local` in the root of the project
- inside of the file create a variable named :
  `NEXT_PUBLIC_RIJKS_API_KEY=your_api_key`

and then you can run :

- `npm run dev` to launch the project locally

## Libraries

For this project i used some library from an improved DX :

- **Next.js** : I used this library / framework for SSR and also the helper components it provide, especially the Image component for optimizing images received from RIJKS and getting a more acceptable payload when fetching and displaying Item.
- **@tanstack/react-query** : Library for fetching data that handle: data caching, race condition, loading / error state, multi-page call, and variable to provide (in this project, search string).
- **lucide-react** : Simple to use and exhaustive icons library

## Project Architecture

The architecture is quiet simple, i made a little diagram on [FigJam](https://www.figma.com/board/RSTIbvTvvSKMz7wXkCdgML/worlike-project-architecture?node-id=0-1&t=UlE8AT1MltRUxmam-1)
