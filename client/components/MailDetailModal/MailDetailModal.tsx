import CloseIcon from "@mui/icons-material/Close"

export const MailDetailModal = (props) => {
  return (
    <div
      className="flex justify-center items-center absolute w-screen h-screen bg-black/30 top-0 left-0 z-10"
      onClick={props.closeModal}
    >
      <div
        className="flex flex-col relative rounded-xl w-96 h-96 sm:w-1/3 sm:h-2/3 bg-white pl-3 pb-3 pr-1"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-initial w-full h-fit justify-between p-3">
          <div>
            <span className="flex flex-1 h-fit self-end pointer-events-none text-gray-500 text-sm">
              At
              <span className="font-medium text-blue-900 ml-1">
                08:10 23/05/2022
              </span>
            </span>
            <span className="flex flex-1 h-fit self-end pointer-events-none text-gray-500">
              From
              <span className="font-medium text-blue-900 ml-1 font-mono text-xl hover:font-bold">
                Some1
              </span>
            </span>
          </div>
          <button className="h-fit" type="button" onClick={props.closeModal}>
            <CloseIcon className="w-7 h-7" />
          </button>
        </div>
        <div className="flex flex-1 overflow-auto scrollbar flex-col">
          <span className="px-2 font-sans font-medium break-words text-xl">
            title
          </span>
          <p className="mt-2">
            {`Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, sit at consequuntur voluptas ipsa reprehenderit deleniti, delectus quo non harum esse ut, repellendus id saepe tenetur velit quam vitae doloribus sequi obcaecati. Vel nihil, enim placeat id numquam iste, expedita ea autem velit iusto dolores nemo fugiat, modi fugit eligendi quam vitae consectetur voluptatem! Molestias, consectetur at voluptatum reiciendis excepturi sit corrupti est ratione recusandae tempora amet beatae nihil officiis, qui nam. Voluptatibus tenetur quia neque alias, similique atque rem sapiente harum ipsum totam quis cum, architecto esse fugit maxime repellat assumenda nam iste impedit at tempore. Consequuntur illo veritatis quo nostrum quaerat optio, temporibus cumque aspernatur eos quidem, deleniti tenetur fuga voluptas? Blanditiis perferendis aliquam consequatur nam deleniti repellat vero ipsam voluptatem numquam quaerat, fugit, saepe odio? Velit reiciendis incidunt consectetur cumque hic dignissimos porro maiores laborum in distinctio, ipsum harum esse omnis iure quis. Consequuntur dolorum velit delectus, animi numquam voluptate eum illum odio ad quo quisquam blanditiis! Perferendis laudantium facere culpa illo, repellat, soluta modi debitis sit facilis praesentium mollitia est id suscipit natus quas sunt ipsum cumque in nihil. Vero accusamus hic voluptas earum voluptatem eos, tempore optio ea. Recusandae vitae iure cum quam. Quasi, accusantium!`}
          </p>
        </div>
      </div>
    </div>
  )
}
