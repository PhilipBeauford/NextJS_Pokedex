import React from 'react'
import Layout from '../components/Layout'
import Link from 'next/Link'


export default function pokemon({ pokeman }) {

    return (
        
        <Layout title={pokeman.name}>
            <h1 className='text-5xl mb-2 text-center capitalize text-white'> {pokeman.name}</h1>
            <img className='mx-auto' src={pokeman.image} alt={pokeman.name} />
            <p className='text-amber-200'><span className='font-bold mr-2 text-white'>Weight : </span>{pokeman.weight}</p>
            <p className='text-amber-200'><span className='font-bold mr-2 text-white'>Height : </span>{pokeman.height}</p>
            <h2 className='text-2xl mt-6 mb-2 text-white font-bold'>Types</h2>
            {pokeman.types.map((type,index) => (
            <p className='text-amber-200' key={index}><span></span> {type.type.name}</p>
            ))}
            <p className='mt-10 text-center'>
                <Link href='/'>
                    <a className='text-2xl underline text-amber-400'>Home</a>
                </Link>
            </p>
            <p>{pokeman.types.type}</p>
        </Layout>
    )
}

export async function getServerSideProps({ query }) {
    const id = query.id
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const pokeman = await res.json()
        const paddedIndex = ('00' + (id)).slice(-3) 
        const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;
        pokeman.image = image
        return {
            props: { pokeman }
        }

    } catch (err) {
        console.error(err)
    }
}