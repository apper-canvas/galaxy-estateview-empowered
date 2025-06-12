import React from 'react';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';

const ContactCard = () => {
  return (
    <Card className="p-6 border border-gray-200">
      <h3 className="text-lg font-heading font-semibold text-primary mb-4">
        Contact Agent
      </h3>
      <div className="space-y-4">
        <Button className="w-full bg-secondary text-white py-3 px-4 hover:bg-secondary/90">
          Call Agent
        </Button>
        <Button className="w-full bg-accent text-white py-3 px-4 hover:bg-accent/90">
          Send Message
        </Button>
        <Button className="w-full border border-gray-300 text-gray-700 py-3 px-4 hover:bg-gray-50 bg-transparent">
          Schedule Tour
        </Button>
      </div>
    </Card>
  );
};

export default ContactCard;
import React from 'react';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';

const ContactCard = () => {
  return (
    <Card className="p-6 border border-gray-200">
      <h3 className="text-lg font-heading font-semibold text-primary mb-4">
        Contact Agent
      </h3>
      <div className="space-y-4">
        <Button className="w-full bg-secondary text-white py-3 px-4 hover:bg-secondary/90">
          Call Agent
        </Button>
        <Button className="w-full bg-accent text-white py-3 px-4 hover:bg-accent/90">
          Send Message
        </Button>
        <Button className="w-full border border-gray-300 text-gray-700 py-3 px-4 hover:bg-gray-50 bg-transparent">
          Schedule Tour
        </Button>
      </div>
    </Card>
  );
};

export default ContactCard;