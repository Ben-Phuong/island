import Image from "next/image"
const Footer = () => {
  return (
    <footer className="flex justify-center p-3 border-t-2 border-solid border-black align-middle">
      <div className="align-top">
        {"Developed by "}
        <a href="https://www.facebook.com/gulutherealfish" target="_blank">
          <span className="hover:font-bold text-xl">Phượng</span>
        </a>
        {" & "}
        <a href="https://www.facebook.com/nhquangtl" target="_blank">
          <span className="hover:font-bold text-xl">Pén</span>
        </a>
      </div>
    </footer>
  )
}

export default Footer
