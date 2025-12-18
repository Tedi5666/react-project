import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { deleteGiveaway, getGiveawayById } from '../../services/giveaway';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext';

export default function DeletePage() {
    const { user } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToast } = useToast();

    useEffect(() => {

        async function setUp() {
            if (!user) return navigate('/catalog');

            const giveaway = await getGiveawayById(id);

            if (giveaway.author.objectId !== user.objectId) {
                return navigate('/catalog');
            }

            try {
                await deleteGiveaway(id, user.sessionToken);
                navigate('/catalog');
            } catch (err) {
                console.error(err);
                addToast(err?.message || 'Delete failed');
            }
        }

        setUp();
    }, [])

    return <></>
}