import Button from "../../../components/ui/Button"
function PageManager({
  pages,
  activePage,
  setActivePage,
  addPage,
}) {
  return (
    <div
      className="
        h-20
        bg-white
        border-t
        border-gray-200
        flex
        items-center
        gap-3
        px-5
        overflow-x-auto
        flex-shrink-0
      "
    >
      {pages.map(
        (page, index) => (
          <div
            key={page.id}
            onClick={() =>
              setActivePage(index)
            }
            className={`
              min-w-[140px]
              h-12
              rounded-lg
              border
              cursor-pointer
              flex
              items-center
              justify-center
              text-sm
              font-medium
              transition
              ${
                activePage ===
                index
                  ? `
                    border-[#20B2AA]
                    bg-[#20B2AA]/10
                    text-[#20B2AA]
                  `
                  : `
                    border-gray-300
                    bg-white
                    text-gray-600
                    hover:bg-gray-50
                  `
              }
            `}
          >
            {page.name}
          </div>
        )
      )}

      <Button
        onClick={addPage}
        className="
          min-w-[140px]
          h-12
          rounded-lg
          bg-[#20B2AA]
          text-white
          font-medium
          hover:opacity-90
        "
      >
        + Add Page
      </Button>
    </div>
  );
}

export default PageManager;