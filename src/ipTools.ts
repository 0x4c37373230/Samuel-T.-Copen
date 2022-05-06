import isReservedIP from "reserved-ip";

type linearIP = {
    o1: number,
    o2: number,
    o3: number,
    o4: number
}

export class ipGenerator
{
    static ip: string;
    static goodIp = false;
    static currentLinearIp: linearIP = { o1: 0, o2: 0, o3: 0, o4: 0 }

    /**
     *
     * @param octetGen - is the octet generator to go through random IPs
     * @param mode - is the IP generation mode
     */
    static generator(octetGen: Generator<number, void>, mode: "random" | "linear"): string
    {
        // TODO: Add linear and random mode checks here to assign a new value

        this.ip = `${octetGen.next().value}.${octetGen.next().value}.${octetGen.next().value}.${octetGen.next().value}`

        while (!this.goodIp)
        {
            if (!isReservedIP(ipGenerator.ip))
                this.goodIp = true;
            else
            {
                switch (mode)
                {
                    case "random":
                        this.ip = `${octetGen.next().value}.${octetGen.next().value}.${octetGen.next().value}.${octetGen.next().value}`
                        break;
                    default:
                        // FIXME: Fix this so that it goes through every IP instead of the fuckery I wrote here for testing

                        this.currentLinearIp = {
                            o1: this.currentLinearIp.o1 === 255 ? this.currentLinearIp.o1 = 0 : this.currentLinearIp.o1++,
                            o2: this.currentLinearIp.o2 === 255 ? this.currentLinearIp.o2 = 0 : this.currentLinearIp.o2++,
                            o3: this.currentLinearIp.o3 === 255 ? this.currentLinearIp.o3 = 0 : this.currentLinearIp.o3++,
                            o4: this.currentLinearIp.o4 === 255 ? this.currentLinearIp.o4 = 0 : this.currentLinearIp.o4++
                        }
                        this.ip = `${this.currentLinearIp.o1}.${this.currentLinearIp.o2}.${this.currentLinearIp.o3}.${this.currentLinearIp.o4}`
                }
            }
        }
        console.log("returning")

        return ipGenerator.ip
    }
}

export class portGenerator
{
    // TODO:
    //  Add random and linear port generation
    //  Check for reserved ports
}

/**
 * Generates octets to "bruteforce" IPs
 */
export function* octetGen()
{
    while (true)
        yield Math.floor(Math.random() * (255 + 1));
}

/**
 * Generates port numbers
 */
export function* portGen()
{
    while (true)
        yield Math.floor(Math.random() * (65535 - 1 + 1)) + 1;
}