import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getGiveawayById } from '../../services/giveaway';
import '../../styles/details.css';

export default function Details() {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    getGiveawayById(id).then(setItem);
  }, [id]);

  if (!item) {
    return <p>Loading...</p>;
  }

  return (
    <section className="details">
      <h2>{item.title}</h2>
      <img src={item.imageUrl} alt={item.title} />
      <p>{item.description}</p>
      <p>Price: ${item.price}</p>
    </section>
  );
}
