import { FaShieldAlt, FaClock, FaUsers } from 'react-icons/fa';

const features = [
  {
    icon: <FaShieldAlt />,
    title: "Data Security",
    description: "Your information is protected with end-to-end encryption."
  },
  {
    icon: <FaClock />,
    title: "24/7 Access",
    description: "Access our services anytime, anywhere without interruption."
  },
  {
    icon: <FaUsers />,
    title: "Team Collaboration",
    description: "Collaborate with your team seamlessly in real-time."
  }
];

export default function FeatureSection() {
  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Key Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="text-4xl text-blue-600 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}