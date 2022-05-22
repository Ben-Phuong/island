export const MailPost = (props) => {
  return (
    <button
      type="button"
      className={
        props.isFirst
          ? "flex flex-none h-64 w-64 bg-blue-500/50 rounded-xl mr-3 border-blue-500/50 border-2 hover:border-blue-700 ml-auto"
          : "flex flex-none h-64 w-64 bg-blue-500/50 rounded-xl mr-3 border-blue-500/50 border-2 hover:border-blue-700"
      }
    >
      <div className="flex relative flex-1 flex-col py-3 items-center">
        <span className="flex-none h-fit w-60 px-1 font-sans font-medium overflow-hidden text-ellipsis align-middle text-2xl text-black/60 text-left whitespace-nowrap">
          This is the title This is the title This is the title This is the
          title This is the title
        </span>
        <div className="w-5/6 h-px bg-blue-500 mt-2"></div>
        <p className="px-4 text-left h-44 w-60 text-ellipsis whitespace-pre-line overflow-hidden">
          {`Lorem ipsum dolor sit amet consectetur adipisicing elit.
          nEos, sit at consequuntur voluptas ipsa reprehenderit deleniti, delectus quo non harum esse ut, repellendus id saepe tenetur velit quam vitae doloribus sequi obcaecati. Vel nihil, enim placeat id numquam iste, expedita ea autem velit iusto dolores nemo fugiat, modi fugit eligendi quam vitae consectetur voluptatem! Molestias, consectetur at voluptatum reiciendis excepturi sit corrupti est ratione recusandae tempora amet beatae nihil officiis, qui nam. Voluptatibus tenetur quia neque alias, similique atque rem sapiente harum ipsum totam quis cum, architecto esse fugit maxime repellat assumenda nam iste impedit at tempore. Consequuntur illo veritatis quo nostrum quaerat optio, temporibus cumque aspernatur eos quidem, deleniti tenetur fuga voluptas? Blanditiis perferendis aliquam consequatur nam deleniti repellat vero ipsam voluptatem numquam quaerat, fugit, saepe odio? Velit reiciendis incidunt consectetur cumque hic dignissimos porro maiores laborum in distinctio, ipsum harum esse omnis iure quis. Consequuntur dolorum velit delectus, animi numquam voluptate eum illum odio ad quo quisquam blanditiis! Perferendis laudantium facere culpa illo, repellat, soluta modi debitis sit facilis praesentium mollitia est id suscipit natus quas sunt ipsum cumque in nihil. Vero accusamus hic voluptas earum voluptatem eos, tempore optio ea. Recusandae vitae iure cum quam. Quasi, accusantium!`}
        </p>
      </div>
    </button>
  )
}
