import { FaCalendarPlus, FaHandHoldingHeart, FaListCheck, FaShieldHalved } from 'react-icons/fa6';

const features = [
  {
    icon: FaCalendarPlus,
    title: 'Create Events Easily',
    text: 'Post a donation drive, plantation day or clean-up in under a minute with date, place and details.',
  },
  {
    icon: FaHandHoldingHeart,
    title: 'Join With One Click',
    text: 'Found a cause you care about? Join the event instantly and let organisers know you are coming.',
  },
  {
    icon: FaListCheck,
    title: 'Track Your Impact',
    text: 'See every event you joined or created in one place, sorted by date so you never miss one.',
  },
  {
    icon: FaShieldHalved,
    title: 'Secure and Private',
    text: 'Only you can edit or delete the events you created, protected by token-based authentication.',
  },
];

export default function Features() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="section-title">Why Seva Circle</h2>
      <p className="section-subtitle">
        Everything a neighbourhood needs to organise good work together.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(({ icon: Icon, title, text }) => (
          <div key={title} className="card h-full bg-base-200 shadow-md">
            <div className="card-body items-center text-center">
              <div className="grid h-14 w-14 place-items-center rounded-full bg-primary/15 text-primary">
                <Icon size={24} />
              </div>
              <h3 className="card-title">{title}</h3>
              <p className="opacity-80 text-sm">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}