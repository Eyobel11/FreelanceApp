const WhyUsSection = () => {
    return (
      <section className="bg-gray-100 py-16 fade-in-on-scroll">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Why Choose Us?</h2>
          <div className="grid grid-cols-2 gap-8">
            {[
              { title: "Vetted Talent", text: "Work with top-rated professionals across the globe.", image: "https://via.placeholder.com/150" },
              { title: "Secure Payments", text: "Escrow system ensures secure transactions.", image: "https://via.placeholder.com/150" },
              { title: "24/7 Support", text: "Our team is always here to assist you.", image: "https://via.placeholder.com/150" },
              { title: "Easy-to-Use Platform", text: "Navigate seamlessly and get work done quickly.", image: "https://via.placeholder.com/150" }
            ].map((item, index) => (
              <div key={index} className="fade-in">
                <img src={item.image} alt={item.title} className="mx-auto mb-4" />
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  export default WhyUsSection;
  