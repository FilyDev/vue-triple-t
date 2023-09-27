export default {
    beforeMount(el, binding) {
        const modifier = binding.modifiers
        const data = binding.value

        const animatedObserver = new IntersectionObserver((entries, animatedScrollObserver) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(`${data}-enter`)
                    animatedScrollObserver.unobserve(entry.target)
                }
            })
        })

        if (modifier.mount) {
            el.classList.add(`${data}-before-enter`)
            animatedObserver.observe(el)
        }
    }
}