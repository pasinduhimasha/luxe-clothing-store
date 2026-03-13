export default function Footer() {
  return (
    <footer id="footer" className="border-t border-white/10 bg-black py-24 px-6 lg:px-20">

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 text-white/70">

        {/* Brand */}
        <div>
          <h2 className="tracking-[10px] font-light text-3xl text-white mb-6">
            LUXE
          </h2>
          <p className="text-sm">
            Premium cinematic clothing experience built for modern fashion lovers.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white mb-6 tracking-widest text-sm uppercase">
            Quick Links
          </h3>

          <div className="flex flex-col space-y-3 text-sm">
            <a href="#latest" className="hover:text-white transition">Latest Drops</a>
            <a href="#topselling" className="hover:text-white transition">Top Selling</a>
            <a href="#categories" className="hover:text-white transition">Categories</a>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white mb-6 tracking-widest text-sm uppercase">
            Contact
          </h3>

          <p className="text-sm">Email: support@luxestore.com</p>
          <p className="text-sm mt-2">Phone: +94 77 123 4567</p>

          {/* Social Icons */}
          <div className="flex space-x-5 mt-6 text-white/60">

            <a href="#" className="hover:text-white transition">Instagram</a>
            <a href="#" className="hover:text-white transition">Facebook</a>
            <a href="#" className="hover:text-white transition">Twitter</a>

          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="text-center text-xs text-white/30 mt-16">
        © 2026 LUXE Clothing. All rights reserved.
      </div>

    </footer>
  );
}