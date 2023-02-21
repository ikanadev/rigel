import dayjs from 'dayjs';
import { useAppData } from '@app/context';

// Returns true if current user is premium, must be used inside provider
const isPremium = () => {
  const { profile } = useAppData();
  const thisYear = dayjs().get('y');
  return profile.subscriptions.some((s) => s.year.value === thisYear);
};

export default isPremium;
