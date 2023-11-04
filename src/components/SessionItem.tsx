import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button';

export interface Session {
  id: string;
  title: string;
  summary: string;
  description: string;
  duration: number;
  date: Date;
  image: string;
}

function SessionItem(props: Session) {
  const navigate = useNavigate();
  const { id, title, summary, image } = props;

  function onClick() {
    navigate(`/session/${id}`);
  }

  return (
    <div className='session-item'>
      <img src={image} alt={title} />
      <div className='session-data'>
        <h3>{title}</h3>
        <p>{summary}</p>
        <div className='actions'>
          <Button onClick={onClick}>Learn more</Button>
        </div>
      </div>
    </div>
  );
}

export default SessionItem;
