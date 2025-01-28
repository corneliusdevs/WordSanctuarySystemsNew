import { InvitationStatus } from "@/types/general";

export const invitations: {
  name: string,
  email: string,
  position: string,
  status: InvitationStatus
}[] = [
    {
      name: 'Samuel King',
      email: 'samuelKi...',
      position: 'HOI',
      status: 'Sent'
    },
    {
      name: 'Ruth Daniel',
      email: 'daniRuth...',
      position: 'HOD',
      status: 'Registered'
    },
    {
      name: 'John James',
      email: 'jj@hotmai...',
      position: 'SM',
      status: 'Accepted'
    },
    {
      name: 'Jane Peter',
      email: 'janep2@g...',
      position: 'HOI',
      status: 'Declined'
    },
    {
      name: 'David Beige',
      email: 'beige12Da...',
      position: 'HOD',
      status: 'Registered'
    },
    {
      name: 'James John',
      email: 'james.Joh...',
      position: 'Member',
      status: 'Registered'
    }
  ];


