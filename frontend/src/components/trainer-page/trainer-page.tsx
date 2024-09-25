import React, { useEffect, useState } from 'react';
import NavBar from '@components/navbar';
import RegisterPokemon from '@components/register-pokemon';
import VisualizePokemon from '@components/visualize-pokemon';
import TableTurn from '@elements/table-turn';
import '@styles/styles.scss';
import prioritizePokemons from '@helpers/prioritize-pokemons';
import pokemones from '@mocks/pokemones';
import { routes } from '@config/api';
import { Type, Status } from 'src/types';

const Trainer: React.FC = () => {
  const pokemons = pokemones;
  const [types, setTypes] = useState<Type[]>([]);
  const [status, setStatus] = useState<Status[]>([]);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await fetch(routes.trainer.types);
        if (!response.ok) {
          throw new Error('Failed to fetch types');
        }
        const data: Type[] = await response.json();
        setTypes(data);
      } catch (error) {
        console.error('Error fetching types:', error);
      }
    };

    fetchTypes();
  }, []);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch(routes.trainer.status);
        if (!response.ok) {
          throw new Error('Failed to fetch status');
        }
        const data: Status[] = await response.json();
        setStatus(data);
      } catch (error) {
        console.error('Error fetching status:', error);
      }
    };

    fetchStatus();
  }, []);

  const handleRegister = (newPokemon: {
    trainer_email: string;
    name: string;
    life_points: number;
    level: number;
    first_type: string;
    second_type: string;
  }) => {
    console.log(newPokemon);
  };

  const sortedPokemons = prioritizePokemons(pokemons);
  return (
    <>
      <NavBar />
      <div className='grid-container-trainer'>
        <div className='item1'>
          <h2 className='text-center'>Turnos</h2>
          <TableTurn pokemones={sortedPokemons} />
        </div>

        <div className='grid-container-form'>
          <div className='item2'>
            <h2 className='text-center'>Registra tu Pokémon</h2>
            <RegisterPokemon pokemonTypes={types} 
              pokemonStatus={status} 
              currentTurn={sortedPokemons.length}
              onRegister={handleRegister} 
            />
          </div>

          <div className='item3'>
            <h2 className='text-center'>Mis Pokémones</h2>
            <VisualizePokemon pokemones={sortedPokemons} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Trainer;
