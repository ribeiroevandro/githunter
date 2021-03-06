import React, { useCallback, useEffect, useState } from 'react';
import { githubApi } from '../../services/api';
import UserCard from '../UserCard';
import { Container } from './styles';

interface UserProps {
  id: string;
  avatar_url: string;
  login: string;
}
const NewUsers: React.FC = () => {
  const [usersList, setUsersList] = useState<UserProps[]>([]);
  const randomNumber = useCallback(() => {
    return Math.floor(Math.random() * 33429773);
  }, []);

  useEffect(() => {
    async function getListUser() {
      const response = await githubApi.get(
        `https://api.github.com/users?since=${randomNumber}&per_page=3`,
      );

      setUsersList(response.data);
    }

    getListUser();
  }, [randomNumber]);
  return (
    <Container>
      <section>
        <h1>Descubra um usuario novo!</h1>
        <div className="section-content">
          {usersList.map(user => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </section>
    </Container>
  );
};

export default NewUsers;
